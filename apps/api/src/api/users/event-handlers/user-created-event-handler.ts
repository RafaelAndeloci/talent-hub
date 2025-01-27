import { logger } from '../../../shared/services/logging-service'

export const handleUserCreated = async ({ userId }: { userId: string }) => {
  logger.info(`Handling user created event for user ${userId}`)
}
