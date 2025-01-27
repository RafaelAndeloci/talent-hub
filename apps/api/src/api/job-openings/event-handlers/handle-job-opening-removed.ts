import { logger } from '../../../shared/services/logging-service'

export const handleJobOpeningRemoved = async ({
  jobOpeningId,
}: {
  jobOpeningId: string
}) => {
  logger.info(
    `Handling job opening removed event for job opening ${jobOpeningId}`,
  )
}
