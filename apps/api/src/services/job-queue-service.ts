import Queue from 'bull';
import klawSync from 'klaw-sync';
import path from 'path';

import { config } from '../config/environment';
import { AppEvent } from '../enums/app-event';
import { logger } from './logging-service';

const { cache } = config;

const eventsQueue = new Queue('jobs', {
    redis: {
        host: cache.host,
        port: cache.port,
    },
})
    .on('completed', (job) => {
        logger.info(`Job ${job.id} completed`);
    })
    .on('failed', (job, error) => {
        logger.error(`Job ${job.id} failed:`, error);
    })
    .on('error', (error) => {
        logger.error('Queue error:', error);
    });

export const jobQueueService = {
    async enqueue({ event, payload }: { event: AppEvent; payload: Record<string, unknown> }) {
        logger.info(`Enqueueing job: ${event}`);

        try {
            await eventsQueue.add(event, payload, {
                jobId: `${event}-${Date.now()}`,
                removeOnComplete: true,
                removeOnFail: true,
                attempts: 3,
                backoff: {
                    type: 'exponential',
                    delay: 5000,
                },
            });
            logger.info(`Job ${event} enqueued successfully`);
        } catch (error) {
            logger.error(`Error enqueuing job: ${event}`, error);
        }
    },
};

export const registerJobQueueListeners = async () => {
    try {
        const events = Object.values(AppEvent);

        const eventHandlers = await Promise.all(
            klawSync(path.resolve(__dirname, '../api'), {
                nodir: true,
                traverseAll: true,
                filter: ({ path }) => path.indexOf('-event-handler') > -1,
            }).map(({ path }) => import(path).then((module) => Object.values(module)[0])),
        );

        events.forEach((event) => {
            const handler = eventHandlers.find((handler) => (handler as any)[event]);
            if (handler) {
                eventsQueue.process(event, (handler as any)[event]);
            } else {
                logger.error(`No handler found for event: ${event}`);
            }
        });
    } catch (error) {
        logger.error('Error registering listeners:', error);
    }
};

