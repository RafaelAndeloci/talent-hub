/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import methodOverride from 'method-override';
import { logger } from '../services/logging-service';
import { buildApiRouter } from './routes';
import { config } from '../config/environment';
import { useServeStaticFiles } from './static-files';
import { errorHandler } from '../middlewares/error-handler-middleware';
const {
    api: { host, port },
} = config;

const app = express();

buildApiRouter().then((apiRouter) => {
    app.use([
        express.json({ strict: true }),
        express.urlencoded({ extended: true }),
        methodOverride(),
        apiRouter,
        useServeStaticFiles,
        errorHandler,
    ] as express.RequestHandler[]);

    app.listen(port, host, () => {
        logger.info(`Server is running at http://${host}:${port}`);
    })
        .on('error', (error) => {
            logger.error('Error while starting the server', error);
            process.exit(1);
        })
        .on('close', () => {
            logger.info('Server is closing');
        });
});
