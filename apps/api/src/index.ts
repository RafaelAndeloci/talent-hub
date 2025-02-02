import { logger } from './services/logging-service';
import { initDatabase } from './config/database/init';
import { config } from './config/environment';
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

        await import('./server');
    } catch (e) {
        logger.error('Error while starting the application', e);
        process.exit(1);
    }
};

runApplication();

process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled Rejection at: ${promise} reason: ${reason}`);
    process.exit(1);
});

process.on('uncaughtException', (error) => {
    logger.error(`Uncaught Exception thrown: ${error}`);
    process.exit(1);
});

process.on('SIGINT', () => {
    logger.info('SIGINT signal received.');
    process.exit(0);
});
