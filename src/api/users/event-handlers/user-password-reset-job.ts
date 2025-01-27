import moment from 'moment'
import path from 'path'
import fs from 'fs'

import { userRepository } from '../user-repository'
import { AppEvent } from '../../../shared/enums/app-event'
import { emailService } from '../../../shared/services/email-service'
import { logger } from '../../../shared/services/logging-service'
import { config } from '../../../config/environment'

export const handleUserPasswordReset = async (userId: string) => {
  logger.info(
    `processing event: ${AppEvent.UserResetPassword} for user ${userId}`,
  )

  try {
    const user = await userRepository.findById(userId)
    if (!user) {
      logger.error(
        `cannot process event: ${AppEvent.UserResetPassword} for user ${userId}`,
      )
      return
    }

    if (!user!.passwordReset) {
      logger.error(
        `cannot process event: ${AppEvent.UserResetPassword} for user ${userId} because password reset info is missing`,
      )
      return
    }

    const isExpired = moment
      .unix(user!.passwordReset.expiration)
      .isBefore(moment())
    if (isExpired) {
      logger.error(
        `cannot process event: ${AppEvent.UserResetPassword} for user ${userId} because password reset token is expired`,
      )
      return
    }

    const frontEndUrl = config.security.password.resetPageUrl
    const resetTokenUrl = `${frontEndUrl}?reset_password_token=${user.passwordReset.token}&user_id=${user.id}`

    const templatePath = path.resolve(
      __dirname,
      '../../../../templates/emails/reset-password.html',
    )

    const templateContent = await fs.promises.readFile(templatePath, 'utf8')

    const body = templateContent.replace(
      /{{reset_password_url}}/g,
      resetTokenUrl,
    )

    await emailService.send({
      to: user.email,
      subject: 'Password reset',
      body,
      bodyType: 'html',
    })
  } catch (error) {
    logger.error(
      `error processing event: ${AppEvent.UserResetPassword}`,
      error,
    )
  }
}
