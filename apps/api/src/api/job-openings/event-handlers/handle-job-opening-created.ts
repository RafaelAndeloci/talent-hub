import { logger } from '../../../services/logging-service';

export const handleJobOpeningCreated = async({ jobOpeningId }: { jobOpeningId: string }) => {
    logger.info(`Handling job opening created event for job opening ${jobOpeningId}`);
};
