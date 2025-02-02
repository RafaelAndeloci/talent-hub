import path from 'path';
import fs from 'fs/promises';

import { AppEvent } from '../../enums/app-event';
import { logger } from '../../services/logging-service';
import { Role } from './types/enums/role';
import { userRepository } from './user-repository';
import { config } from '../../config/environment';
import moment from 'moment';
import { emailService } from '../../services/email-service';

const emailTemplatePath = path.resolve(__dirname, '../../../static/templates/emails');

export const UserEventHandler = {
    [AppEvent.userCreated]: async ({ userId }: { userId: string }) => {
        try {
            const user = await userRepository.findById(userId);
            if (!user) {
                logger.info(
                    `Cannot process event ${AppEvent.userCreated}: user ${userId} not found`,
                );
                return;
            }

            if (user.role === Role.sysAdmin) {
                return;
            }

            if (!user.emailConfirmation || user.emailConfirmation.sentAt) {
                logger.info(`confirmation email already sent to user ${user.username}`);
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

            await emailService.send({
                to: user.email,
                subject: `${user.username}, bem-vindo ao Talent Hub! Confirme seu e-mail`,
                body: emailContent,
                isHtml: true,
            });

            user.emailConfirmation.sentAt = new Date();
            await userRepository.update(user);

            logger.info(`Confirmation email sent to user ${user.username}`);
        } catch (error) {
            logger.error(`Error processing event ${AppEvent.userCreated}: ${error}`);
        }
    },

    [AppEvent.userPasswordChanged]: async ({ userId }: { userId: string }) => {
        try {
            const user = await userRepository.findById(userId);
            if (!user) {
                logger.info(`cannot process event ${AppEvent.userPasswordChanged}: user not found`);
                return;
            }

            const templatePath = path.resolve(__dirname, `${emailTemplatePath}/pass-change-info`);

            const emailBody = await fs.readFile(templatePath, 'utf8');

            await emailService.send({
                to: user.email,
                subject: 'Password changed',
                body: emailBody
                    .replace('@username', user.username)
                    .replace('@currYear', moment().format('YYYY')),
                isHtml: true,
            });
        } catch (e) {
            logger.error(
                `Error processing event ${AppEvent.userPasswordChanged}: ${(e as unknown as Error).message}`,
            );
        }
    },

    [AppEvent.userPasswordResetTokenRequested]: async ({ userId }: { userId: string }) => {
        logger.info(
            `processing event: ${AppEvent.userPasswordResetTokenRequested} for user ${userId}`,
        );

        try {
            const user = await userRepository.findById(userId);
            if (!user) {
                logger.error(
                    `cannot process event: ${AppEvent.userPasswordResetTokenRequested} for user ${userId}`,
                );
                return;
            }

            if (!user!.passwordReset) {
                logger.error(
                    `cannot process event: ${AppEvent.userPasswordResetTokenRequested} for user ${userId} because password reset info is missing`,
                );
                return;
            }

            const isExpired = moment.unix(user!.passwordReset.expiration).isBefore(moment());
            if (isExpired) {
                logger.error(
                    `cannot process event: ${AppEvent.userPasswordResetTokenRequested} for user ${userId} because password reset token is expired`,
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

            await emailService.send({
                to: user.email,
                subject: 'Password reset',
                body: emailBody,
                isHtml: true,
            });
        } catch (error) {
            logger.error(
                `error processing event: ${AppEvent.userPasswordResetTokenRequested}`,
                error,
            );
        }
    },

    [AppEvent.userEmailConfirmed]: (id: string) => {
        console.log(`User ${id} password reset`);
    },
};
