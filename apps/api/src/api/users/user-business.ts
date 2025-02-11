import { Op } from 'sequelize';
import moment from 'moment';

import { userRepository } from './user-repository';
import { config } from '../../config/environment';
import { userParser } from './user-parser';
import { hasher } from '../../services/hasher';
import { AppEvent } from '../../enums/app-event';
import { fileStorageService } from '../../services/file-storage-service';
import { jobQueueService } from '../../services/job-queue-service';
import { jwtService } from '../../services/jwt-service';
import { ApiError } from '../../types/api-error';
import { UserBusiness } from '../../types/user-business';
import { Role } from '@talent-hub/shared';

export const userBusiness: UserBusiness = {
    findById: async ({ userId }) => {
        const user = await userRepository.findById(userId);
        if (!user) {
            ApiError.throwNotFound(`user with id ${userId}`);
        }

        return userParser.toDto({ user });
    },

    findAll: async ({ query }) => {
        const users = await userRepository.findAll(query);
        return users.parse((user) => userParser.toDto({ user }));
    },

    create: async ({ payload }) => {
        if (
            await userRepository.exists({
                [Op.or]: [{ email: payload.email }, { username: payload.username }],
            })
        ) {
            ApiError.throwConflict('cannot create user');
        }

        const hashedPassword = await hasher.hash(payload.password);
        const emailConfirmationToken = await hasher.genRandomToken();

        const user = userParser.newInstance({
            ...payload,
            hashedPassword,
            emailConfirmationToken,
        });

        await userRepository.create(user);

        await jobQueueService.enqueue({
            event: AppEvent.UserCreated,
            payload: { userId: user.id },
        });

        return userParser.toDto({ user });
    },

    auth: async ({ payload }) => {
        const user = await userRepository.findByEmailOrUserName(payload.identifier);
        if (!user) {
            ApiError.throwNotFound('invalid credentials');
        }

        if (user.emailConfirmation && user.role !== Role.SysAdmin) {
            ApiError.throwForbidden('email not confirmed');
        }

        if (!(await hasher.compare(payload.password, user.hashedPassword))) {
            ApiError.throwUnauthorized('invalid credentials');
        }

        const dto = userParser.toDatabase(user);
        return jwtService.generateToken(dto);
    },

    updateProfilePicture: async ({ userId, file }) => {
        const user = await userRepository.findById(userId);
        if (!user) {
            ApiError.throwNotFound('user not found');
        }

        const key = `user-${userId}-profile-picture.${file.mimetype.split('/')[1]}`;
        const url = await fileStorageService.upload({
            key,
            file: file.content,
            contentType: file.mimetype,
        });

        user.profilePictureUrl = url;

        await userRepository.update(user);

        return userParser.toDto({ user });
    },

    remove: async ({ userId }) => {
        const user = await userRepository.findById(userId);
        if (!user) {
            ApiError.throwNotFound('user not found');
        }

        await userRepository.deleteById(userId);
    },

    sendChangePasswordToken: async ({ identifier }) => {
        const user = await userRepository.findByEmailOrUserName(identifier);
        if (!user) {
            ApiError.throwNotFound('user not found');
        }

        user.passwordReset = {
            token: await hasher.genRandomToken(),
            expiration: moment().add(config.security.password.resetExpiration, 'hours').unix(),
        };

        await userRepository.update(user);

        await jobQueueService.enqueue({
            event: AppEvent.UserPasswordResetTokenRequested,
            payload: { userId: user.id },
        });
    },

    confirmChangePassword: async ({ userId, payload }) => {
        const user = await userRepository.findById(userId);
        if (!user) {
            ApiError.throwBadRequest('invalid user id');
        }

        if (!user.passwordReset) {
            ApiError.throwBadRequest('user did confirm password reset');
        }

        const isExpired = moment().unix() > user.passwordReset!.expiration;
        if (isExpired) {
            ApiError.throwBadRequest('token expired');
        }

        if (user.passwordReset!.token !== payload.token) {
            ApiError.throwBadRequest('invalid token');
        }

        const isSamePassword = await hasher.compare(payload.password, user.hashedPassword);
        if (isSamePassword) {
            ApiError.throwUnprocessableEntity(`password alredy is used`);
        }

        const newHash = await hasher.hash(payload.password);

        user.hashedPassword = newHash;
        user.passwordReset = null;

        await userRepository.update(user);

        await jobQueueService.enqueue({
            event: AppEvent.UserPasswordChanged,
            payload: { userId: user.id },
        });
    },

    confirmEmail: async ({ userId, token }) => {
        const user = await userRepository.findById(userId);
        if (!user) {
            ApiError.throwBadRequest('invalid user id');
        }

        if (!user.emailConfirmation) {
            ApiError.throwBadRequest('email already confirmed');
        }

        if (user.emailConfirmation!.token !== token) {
            ApiError.throwBadRequest('invalid token');
        }

        user.emailConfirmation!.confirmedAt = new Date();

        await userRepository.update(user);

        await jobQueueService.enqueue({
            event: AppEvent.UserEmailConfirmed,
            payload: { userId: user.id },
        });
    },

    canCreateCandidate: ({ user }) => user.role === Role.Candidate || user.role === Role.SysAdmin,
};
