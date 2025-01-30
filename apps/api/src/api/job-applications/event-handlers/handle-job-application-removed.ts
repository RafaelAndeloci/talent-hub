import { logger } from '../../../services/logging-service';

export const handleJobApplicationRemoved = async({
    jobApplicationId,
}: {
    jobApplicationId: string;
}) => {
    logger.info(`Handling job application removed event for job application ${jobApplicationId}`);
};
