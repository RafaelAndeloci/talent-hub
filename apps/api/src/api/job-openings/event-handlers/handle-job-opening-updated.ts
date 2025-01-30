import { logger } from '../../../services/logging-service';

export const handleJobOpeningUpdated = async({ jobOpeningId }: { jobOpeningId: string }) => {
    logger.info(`Handling job opening updated event for job opening ${jobOpeningId}`);
};
