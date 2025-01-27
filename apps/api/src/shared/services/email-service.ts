import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

import { config } from '../../config/environment'
import { logger } from './logging-service'

const ses = new SESClient({
  region: config.cloud.region,
  credentials: {
    accessKeyId: config.cloud.accessKeyId,
    secretAccessKey: config.cloud.secretAccessKey,
  },
})

export const emailService = {
  async send(args: {
    to: string
    body: string
    bodyType: 'html' | 'text'
    subject: string
  }) {
    const command = new SendEmailCommand({
      Source: config.email.from,
      Destination: {
        ToAddresses: [args.to],
      },
      Message: {
        Body: {
          [args.bodyType]: {
            Data: args.body,
          },
        },
        Subject: {
          Data: args.subject,
        },
      },
    })

    try {
      const data = await ses.send(command)
      logger.info('Email sent', data)
    } catch (error) {
      logger.error('Error sending email', error)
      throw error
    }
  },
}
