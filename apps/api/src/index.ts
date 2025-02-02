import { logger } from './services/logging-service';
import { initDatabase } from './config/database/init';
import { config } from './config/environment';
import { registerJobQueueListeners } from './services/job-queue-service';
const {
    database: { sync },
} = config;

const runApplication = async () => {
    try {
        await initDatabase({
            sync: sync.enabled,
            force: sync.force,
            alter: sync.alter,
        });

        await registerJobQueueListeners();

        await import('./server');
    } catch (e) {
        logger.error('Error while starting the application', e);
        process.exit(1);
    }
};

runApplication();
