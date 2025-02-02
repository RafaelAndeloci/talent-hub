import moment from 'moment';
import path from 'path';
import fs from 'fs';

import { userRepository } from '../user-repository';
import { AppEvent } from '../../../enums/app-event';
import { emailService } from '../../../services/email-service';
import { logger } from '../../../services/logging-service';
import { config } from '../../../config/environment';

export const handleUserPasswordResetTokenRequested = async({ userId }: { userId: string }) => {
    logger.info(`processing event: ${AppEvent.userPasswordResetTokenRequested} for user ${userId}`);

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
            '../../../../static/templates/emails/pass-change-token.html',
        );

        let emailBody = await fs.promises.readFile(templatePath, 'utf8');
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
        logger.error(`error processing event: ${AppEvent.userPasswordResetTokenRequested}`, error);
    }
};
