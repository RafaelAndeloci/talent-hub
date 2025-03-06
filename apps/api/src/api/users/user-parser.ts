import _ from 'lodash';
import DbParser from '@talent-hub/shared/types/db-parser';
import { CreateUserPayload, newUUID, User, UserDto } from '@talent-hub/shared';
import { UserModelAttr } from './user-model';
import Role from '@talent-hub/shared/types/role';
import moment from 'moment';

type UserParser = DbParser<User, UserModelAttr> & {
    newInstance: (args: { payload: CreateUserPayload; hashedPassword: string }) => User;
    toDto: (user: User) => UserDto;
};

export const userParser: UserParser = {
    fromDb: (model) => ({
        id: model.id,
        username: model.username,
        email: model.email,
        hashedPassword: model.hashedPassword,
        passwordReset:
            model.passwordResetExpiresAt && model.passwordResetToken
                ? {
                      expiresAt: model.passwordResetExpiresAt!,
                      token: model.passwordResetToken!,
                  }
                : null,
        emailConfirmation: model.emailConfirmationToken
            ? {
                  token: model.emailConfirmationToken!,
                  sentAt: model.emailConfirmationTokenSentAt!,
                  confirmedAt: model.emailConfirmedAt!,
              }
            : null,
        profilePictureUrl: model.profilePictureUrl,
        role: model.role,
        createdAt: model.createdAt,
        updatedAt: model.updatedAt,
    }),

    toDb: (user) => ({
        id: user.id,
        username: user.username,
        email: user.email,
        hashedPassword: user.hashedPassword,
        role: user.role,
        profilePictureUrl: user.profilePictureUrl,
        passwordResetExpiresAt: user.passwordReset?.expiresAt || null,
        passwordResetToken: user.passwordReset?.token || null,
        emailConfirmationToken: user.emailConfirmation?.token || null,
        emailConfirmationTokenSentAt: user.emailConfirmation?.sentAt || null,
        emailConfirmedAt: user.emailConfirmation?.confirmedAt || null,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    }),

    newInstance: ({ payload, hashedPassword }) => ({
        id: newUUID(),
        username: payload.username,
        email: payload.email,
        hashedPassword: hashedPassword,
        passwordReset: null,
        profilePictureUrl: null,
        role: payload.role,
        emailConfirmation: {
            token: payload.role === Role.SysAdmin ? null : newUUID(),
            sentAt: null,
            confirmedAt: null,
        },
        createdAt: moment(),
        updatedAt: moment(),
    }),

    toDto: (user) => _.omit(user, ['hashedPassword', 'emailConfirmation', 'passwordReset']),
};
