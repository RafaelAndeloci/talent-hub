import { connectToDatabase } from './config/database';
import logger from './services/logging-service';

process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise} reason: ${reason}`);
  process.exit(1);
});

(async () => {
  await connectToDatabase();
  await import('./server');
})();
