import path from 'path';
import fs from 'fs/promises';

import { AppEvent } from '../../enums/app-event';
import { Logger } from '../../services/logging-service';
import { config } from '../../config/environment';
import moment from 'moment';
import UserRepository from './user-repository';
import EmailService from '../../services/email-service';
import { Role } from '@talent-hub/shared';

const emailTemplatePath = path.resolve(__dirname, '../../../static/templates/emails');

const userRepository = new UserRepository();

export const UserEventHandler = {
    [AppEvent.UserCreated]: async ({ userId }: { userId: string }) => {
        try {
            const user = await userRepository.findById(userId);
            if (!user) {
                Logger.info(
                    `Cannot process event ${AppEvent.UserCreated}: user ${userId} not found`,
                );
                return;
            }

            if (user.role === Role.SysAdmin) {
                return;
            }

            if (!user.emailConfirmation || user.emailConfirmation.sentAt) {
                Logger.info(`confirmation email already sent to user ${user.username}`);
                return;
            }

            const templatePath = path.resolve(
                __dirname,
                `${emailTemplatePath}/email-confirmation.html`,
            );

            let emailContent = await fs.readFile(templatePath, 'utf-8');

            emailContent = emailContent
                .replace('@username', user.username)
                .replace(
                    '@emailConfirmationUrl',
                    `${config.emailConfirmationUrl}?token=${user.emailConfirmation!.token}&userId=${user.id}`,
                )
                .replace('@currYear', moment().format('YYYY'));

            await EmailService.send({
                to: user.email,
                subject: `${user.username}, bem-vindo ao Talent Hub! Confirme seu e-mail`,
                body: emailContent,
                isHtml: true,
            });

            user.emailConfirmation.sentAt = moment();
            await userRepository.update({ entity: user });

            Logger.info(`Confirmation email sent to user ${user.username}`);
        } catch (error) {
            Logger.error(`Error processing event ${AppEvent.UserCreated}: ${error}`);
        }
    },

    [AppEvent.UserPasswordChanged]: async ({ userId }: { userId: string }) => {
        try {
            const user = await userRepository.findById(userId);
            if (!user) {
                Logger.info(`cannot process event ${AppEvent.UserPasswordChanged}: user not found`);
                return;
            }

            const templatePath = path.resolve(__dirname, `${emailTemplatePath}/pass-change-info`);

            const emailBody = await fs.readFile(templatePath, 'utf8');

            await EmailService.send({
                to: user.email,
                subject: 'Password changed',
                body: emailBody
                    .replace('@username', user.username)
                    .replace('@currYear', moment().format('YYYY')),
                isHtml: true,
            });
        } catch (e) {
            Logger.error(
                `Error processing event ${AppEvent.UserPasswordChanged}: ${(e as unknown as Error).message}`,
            );
        }
    },

    [AppEvent.UserPasswordResetTokenRequested]: async ({ userId }: { userId: string }) => {
        Logger.info(
            `processing event: ${AppEvent.UserPasswordResetTokenRequested} for user ${userId}`,
        );

        try {
            const user = await userRepository.findById(userId);
            if (!user) {
                Logger.error(
                    `cannot process event: ${AppEvent.UserPasswordResetTokenRequested} for user ${userId}`,
                );
                return;
            }

            if (!user!.passwordReset) {
                Logger.error(
                    `cannot process event: ${AppEvent.UserPasswordResetTokenRequested} for user ${userId} because password reset info is missing`,
                );
                return;
            }

            const isExpired = user!.passwordReset.expiresAt.isBefore(moment());
            if (isExpired) {
                Logger.error(
                    `cannot process event: ${AppEvent.UserPasswordResetTokenRequested} for user ${userId} because password reset token is expired`,
                );
                return;
            }

            const templatePath = path.resolve(
                __dirname,
                `${emailTemplatePath}/pass-change-token.html`,
            );

            let emailBody = await fs.readFile(templatePath, 'utf8');
            const frontEndUrl = config.security.password.resetPageUrl;
            const resetTokenUrl = `${frontEndUrl}?reset_password_token=${user.passwordReset.token}&user_id=${user.id}`;

            emailBody = emailBody
                .replace('@username', user!.username)
                .replace('@resetPasswordUrl', resetTokenUrl)
                .replace('@currYear', moment().format('YYYY'));

            await EmailService.send({
                to: user.email,
                subject: 'Password reset',
                body: emailBody,
                isHtml: true,
            });
        } catch (error) {
            Logger.error(
                `error processing event: ${AppEvent.UserPasswordResetTokenRequested}`,
                error,
            );
        }
    },

    //TODO
    [AppEvent.UserEmailConfirmed]: (id: string) => {
        console.log(`User ${id} password reset`);
    },
};
