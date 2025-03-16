import klawSync from 'klaw-sync';
import path from 'path';

import { config } from '../config/environment';
import { AppEvent } from '../enums/app-event';
import BullQueue from 'bull';

export class JobQueueService {
    private static listenersRegistered = false;

    private static readonly eventsQueue = new BullQueue('jobs', {
        redis: {
            host: config.cache.host,
            port: config.cache.port,
        },
    })
        .on('completed', (job) => console.log(`Job ${job.id} completed`))
        .on('failed', (job, error) => console.error(`Job ${job.id} failed:`, error))
        .on('error', (error) => console.error('Queue error:', error));

    static async enqueue({
        event,
        payload,
    }: {
        event: AppEvent;
        payload: Record<string, unknown>;
    }) {
        console.log(`Enqueueing job: ${event}`);

        try {
            await JobQueueService.eventsQueue.add(event, payload, {
                jobId: `${event}-${Date.now()}`,
                removeOnComplete: true,
                removeOnFail: true,
                attempts: 3,
                backoff: {
                    type: 'exponential',
                    delay: 5000,
                },
            });
            console.log(`Job ${event} enqueued successfully`);
        } catch (error) {
            console.error(`Error enqueuing job: ${event}`, error);
        }
    }

    static async registerListeners() {
        try {
            if (this.listenersRegistered) {
                return;
            }

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
                    JobQueueService.eventsQueue.process(event, (handler as any)[event]);
                } else {
                    console.error(`No handler found for event: ${event}`);
                }
            });

            this.listenersRegistered = true;
        } catch (error) {
            this.listenersRegistered = false;
            console.error('Error registering listeners:', error);
        }
    }
}
