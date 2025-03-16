import {
    CreateUserPayload,
    newUUID,
    PagedResponse,
    QueryArgs,
    Role,
    User,
    UserDto,
} from '@talent-hub/shared';

import { userParser } from './user-parser';
import UserRepository from './user-repository';
import ApiError from '../../utils/api-error';
import Hasher from '../../services/hasher';
import { JobQueueService } from '../../services/job-queue-service';
import { AppEvent } from '../../enums/app-event';
import JwtService from '../../services/jwt-service';
import { FileStorageService } from '../../services/file-storage-service';
import moment from 'moment';

export default class UserBusiness {
    constructor(private userRepository: UserRepository = new UserRepository()) {}

    findById = async ({ userId }: { userId: string }): Promise<UserDto> => {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            ApiError.throwNotFound(`user with id ${userId}`);
        }

        return userParser.toDto(user);
    };

    findAll = async ({ query }: { query: QueryArgs<User> }): Promise<PagedResponse<UserDto>> => {
        const users = await this.userRepository.findAll(query);
        return users.parse(userParser.toDto);
    };

    create = async ({ payload }: { payload: CreateUserPayload }): Promise<UserDto> => {
        const existingUser = await this.userRepository.findBy({
            email: payload.email,
            username: payload.username,
        });
        if (existingUser) {
            ApiError.throwConflict('cannot create user');
        }

        const hashedPassword = await Hasher.hash(payload.plainPassword);

        const user = userParser.newInstance({
            hashedPassword,
            payload,
        });

        await this.userRepository.create({ entity: user });

        await JobQueueService.enqueue({
            event: AppEvent.UserCreated,
            payload: { userId: user.id },
        });

        return userParser.toDto(user);
    };

    auth = async ({
        payload: { identifier, password },
    }: {
        payload: { identifier: string; password: string };
    }) => {
        const user = await this.userRepository.findBy({
            email: identifier,
            username: identifier,
        });
        if (!user) {
            ApiError.throwNotFound('invalid credentials');
        }

        if (user.emailConfirmation && user.role !== Role.SysAdmin) {
            ApiError.throwForbidden('email not confirmed');
        }

        if (!(await Hasher.compare(password, user.hashedPassword))) {
            ApiError.throwUnauthorized('invalid credentials');
        }

        const dto = userParser.toDto(user);
        return JwtService.generateToken(dto);
    };

    updateProfilePicture = async ({
        userId,
        file,
    }: {
        userId: string;
        file: { content: Buffer; mimetype: string };
    }) => {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            ApiError.throwNotFound('user not found');
        }

        const key = `user-${userId}-profile-picture.${file.mimetype.split('/')[1]}`;
        const url = await FileStorageService.upload({
            key,
            file: file.content,
            contentType: file.mimetype,
        });

        user.profilePictureUrl = url;

        await this.userRepository.update({ entity: user });

        return userParser.toDto(user);
    };

    remove = async ({ userId }: { userId: string }) => {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            ApiError.throwNotFound('user not found');
        }

        await this.userRepository.deleteById({ id: userId });
    };

    sendChangePasswordToken = async ({ identifier }: { identifier: string }) => {
        const user = await this.userRepository.findBy({
            email: identifier,
            username: identifier,
        });
        if (!user) {
            ApiError.throwNotFound('user not found');
        }

        user.passwordReset = {
            token: newUUID(),
            expiresAt: moment().add(1, 'week'),
        };

        await this.userRepository.update({ entity: user });

        await JobQueueService.enqueue({
            event: AppEvent.UserPasswordResetTokenRequested,
            payload: { userId: user.id },
        });
    };

    confirmChangePassword = async ({
        userId,
        payload,
    }: {
        userId: string;
        payload: { token: string; password: string };
    }) => {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            ApiError.throwBadRequest('invalid user id');
        }

        if (!user.passwordReset) {
            ApiError.throwBadRequest('user did confirm password reset');
        }

        const isExpired = moment().isAfter(user.passwordReset.expiresAt);
        if (isExpired) {
            ApiError.throwBadRequest('token expired');
        }

        if (user.passwordReset.token !== payload.token) {
            ApiError.throwBadRequest('invalid token');
        }

        const isSamePassword = await Hasher.compare(payload.password, user.hashedPassword);
        if (isSamePassword) {
            ApiError.throwUnprocessableEntity(`password alredy is used`);
        }

        const newHash = await Hasher.hash(payload.password);

        user.hashedPassword = newHash;
        user.passwordReset = null;

        await this.userRepository.update({ entity: user });

        await JobQueueService.enqueue({
            event: AppEvent.UserPasswordChanged,
            payload: { userId: user.id },
        });
    };

    confirmEmail = async ({ userId, token }: { userId: string; token: string }) => {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            ApiError.throwBadRequest('invalid user id');
        }

        if (!user.emailConfirmation) {
            ApiError.throwBadRequest('email already confirmed');
        }

        if (user.emailConfirmation.token !== token) {
            ApiError.throwBadRequest('invalid token');
        }

        user.emailConfirmation.confirmedAt = moment();

        await this.userRepository.update({ entity: user });

        await JobQueueService.enqueue({
            event: AppEvent.UserEmailConfirmed,
            payload: { userId: user.id },
        });
    };

    canCreateCandidate = ({ user }: { user: User }) =>
        user.role === Role.Candidate || user.role === Role.SysAdmin;
}
