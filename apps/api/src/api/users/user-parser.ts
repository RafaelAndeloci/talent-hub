import * as uuid from 'uuid';
import _ from 'lodash';

import { UserParser } from './types/user-parser';

export const userParser: UserParser = {
    fromDatabase: (model) => ({
        id: model.id,
        username: model.username,
        email: model.email,
        hashedPassword: model.hashedPassword,
        passwordReset:
            model.passwordResetExpiration && model.passwordResetToken
                ? {
                      expiration: model.passwordResetExpiration,
                      token: model.passwordResetToken,
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

    toDatabase: (user) => ({
        id: user.id,
        username: user.username,
        email: user.email,
        hashedPassword: user.hashedPassword,
        role: user.role,
        profilePictureUrl: user.profilePictureUrl,
        passwordResetExpiration: user.passwordReset?.expiration || null,
        passwordResetToken: user.passwordReset?.token || null,
        emailConfirmationToken: user.emailConfirmation?.token || null,
        emailConfirmationTokenSentAt: user.emailConfirmation?.sentAt || null,
        emailConfirmedAt: user.emailConfirmation?.confirmedAt || null,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    }),

    newInstance: ({ username, role, email, hashedPassword, emailConfirmationToken }) => ({
        id: uuid.v4(),
        username,
        email,
        hashedPassword,
        passwordReset: null,
        profilePictureUrl: null,
        role,
        emailConfirmation: {
            token: emailConfirmationToken,
            sentAt: null,
            confirmedAt: null,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
    }),

    toDto: ({ user }) =>
        _.omit(user, ['hashedPassword', 'emailConfirmation', 'passwordReset']),
};
