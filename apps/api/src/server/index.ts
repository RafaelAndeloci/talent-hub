import express from 'express';
import methodOverride from 'method-override';
import cors from 'cors';

import { logger } from '../services/logging-service';
import { buildApiRouter } from './routes';
import { config } from '../config/environment';
import { getStaticFilesRouter } from './static-files';
import { errorHandler } from '../middlewares/error-handler-middleware';
const {
    api: { host, port },
} = config;

export const app = express();

async function startServer() {
    const apiRouter = await buildApiRouter();

    app.use([
        getStaticFilesRouter(),
        cors({
            origin: '*',
        }),
        express.json({ strict: true }),
        express.urlencoded({ extended: true }),
        methodOverride(),
        apiRouter,
        errorHandler,
        (_, res) => {
            if (!res.headersSent) {
                res.status(404).json({
                    status: 'Not Found',
                    code: 404,
                    errors: ['Resource not found'],
                });
            }
        },
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
}

process.on('SIGINT', () => {
    logger.info('Received SIGINT, shutting down...');
    app.emit('close');
});

process.on('SIGTERM', () => {
    logger.info('Received SIGTERM, shutting down...');
    app.emit('close');
});

export const serverStartPromise = startServer();
