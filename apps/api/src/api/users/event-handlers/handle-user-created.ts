import path from 'path';
import { AppEvent } from '../../../enums/app-event';
import { logger } from '../../../services/logging-service';
import { userRepository } from '../user-repository';
import fs from 'fs/promises';
import { emailService } from '../../../services/email-service';
import { config } from '../../../config/environment';
import moment from 'moment';
import { Role } from '../types/enums/role';

export const handleUserCreated = async ({ userId }: { userId: string }) => {
    try {
        const user = await userRepository.findById(userId);
        if (!user) {
            logger.info(`Cannot process event ${AppEvent.userCreated}: user ${userId} not found`);
            return;
        }

        if (user.role === Role.sysAdmin) {
            return;
        }

        if (!user.emailConfirmation || user.emailConfirmation.sentAt) {
            logger.info(`confirmation email already sent to user ${user.username}`);
            return
        }

        const emailTemplatePath = path.resolve(
            __dirname,
            '../../../../static/templates/emails/email-confirmation.html',
        );

        let emailContent = await fs.readFile(emailTemplatePath, 'utf-8');

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
};
