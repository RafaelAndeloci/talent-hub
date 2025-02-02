import path from 'path';
import { AppEvent } from '../../../enums/app-event';
import { emailService } from '../../../services/email-service';
import { logger } from '../../../services/logging-service';
import { userRepository } from '../user-repository';
import fs from 'fs';
import moment from 'moment';

export const handleUserPasswordChanged = async({ userId }: { userId: string }) => {
    try {
        const user = await userRepository.findById(userId);
        if (!user) {
            logger.info(`cannot process event ${AppEvent.userPasswordChanged}: user not found`);
            return;
        }

        const templatePath = path.resolve(
            __dirname,
            '../../../../static/templates/emails/pass-change-info.html',
        );

        const emailBody = await fs.promises.readFile(templatePath, 'utf8');

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
};
