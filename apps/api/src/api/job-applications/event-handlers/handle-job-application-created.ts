import { logger } from '../../../shared/services/logging-service'

export const handleJobApplicationCreated = async ({
  jobApplicationId,
}: {
  jobApplicationId: string
}) => {
  logger.info(
    `Handling job application created event for job application ${jobApplicationId}`,
  )
}
