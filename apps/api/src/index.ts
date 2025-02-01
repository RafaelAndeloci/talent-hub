import { logger } from './services/logging-service';
import { config } from './config/environment';
import { initDatabase } from './config/database/init';

const runApplication = async () => {
    try {
        await initDatabase({
            sync: config.database.sync.enabled,
            force: config.database.sync.force,
            alter: config.database.sync.alter,
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
