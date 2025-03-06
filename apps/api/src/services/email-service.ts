import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import HTTPStatus from 'http-status';

import { config } from '../config/environment';

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

export default class EmailService {
    public static async send({
        body,
        isHtml,
        to,
        subject,
    }: {
        body: string;
        isHtml?: boolean;
        to: string;
        subject: string;
    }) {
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
                console.log('Error sending email', response);
            }
        } catch (error) {
            console.log('Error sending email', error);
            throw error;
        }
    }
}