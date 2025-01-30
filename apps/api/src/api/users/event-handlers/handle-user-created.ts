import path from 'path';
import { AppEvent } from '../../../enums/app-event';
import { logger } from '../../../services/logging-service';
import { userRepository } from '../user-repository';
import fs from 'fs/promises';
import { emailService } from '../../../services/email-service';
import { config } from '../../../config/environment';
import moment from 'moment';

export const handleUserCreated = async({ userId }: { userId: string }) => {
    try {
        const user = await userRepository.findById(userId);
        if (!user) {
            logger.info(`Cannot process event ${AppEvent.userCreated}: user ${userId} not found`);
            return;
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
                `${config.emailConfirmationUrl}?token=${user.emailConfirmationToken}&userId=${user.id}`,
            )
            .replace('@currYear', moment().format('YYYY'));

        await emailService.send({
            to: user.email,
            subject: `${user.username}, bem-vindo ao Talent Hub! Confirme seu e-mail`,
            body: emailContent,
            isHtml: true,
        });

        logger.info(`Email de confirmação enviado com sucesso para o usuário ${user.username}`);
    } catch (error) {
        logger.error(`Error processing event ${AppEvent.userCreated}: ${error}`);
    }
};
