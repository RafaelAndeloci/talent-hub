import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import HTTPStatus from 'http-status';

import { config } from '../config/environment';
import { logger } from './logging-service';
import { EmailService } from './types/email-service';

const {
    aws: {
        region,
        secretAccessKey,
        accessKeyId,
        ses: { from: source },
    },
} = config;

const sesClient = new SESClient({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});

export const emailService: EmailService = {
    send: async ({ body, isHtml, to, subject }) => {
        try {
            const command = new SendEmailCommand({
                Destination: {
                    ToAddresses: [to],
                },
                Message: {
                    Body: {
                        [isHtml ? 'Html' : 'Text']: {
                            Charset: 'UTF-8',
                            Data: body,
                        },
                    },
                    Subject: {
                        Charset: 'UTF-8',
                        Data: subject,
                    },
                },
                Source: source,
                ReplyToAddresses: [source],
            });
            const response = await sesClient.send(command);
            if (response.$metadata.httpStatusCode !== HTTPStatus.OK) {
                logger.error('Error sending email', response);
            }
        } catch (error) {
            logger.error('Error sending email', error);
            throw error;
        }
    },
};
