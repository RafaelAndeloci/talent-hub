import Queue from 'bull'
import { config } from '../../config/environment'
import { AppEvent } from '../enums/app-event'
import { logger } from './logging-service'
import { handleJobApplicationCreated } from '../../api/job-applications/event-handlers/handle-job-application-created'
import { handleJobApplicationRemoved } from '../../api/job-applications/event-handlers/handle-job-application-removed'
import { handleJobOpeningCreated } from '../../api/job-openings/event-handlers/handle-job-opening-created'
import { handleJobOpeningRemoved } from '../../api/job-openings/event-handlers/handle-job-opening-removed'
import { handleJobOpeningUpdated } from '../../api/job-openings/event-handlers/handle-job-opening-updated'
import { handleUserCreated } from '../../api/users/event-handlers/handle-user-created'
import { handleUserPasswordChanged } from '../../api/users/event-handlers/handle-user-password-changed'
import { handleUserPasswordResetTokenRequested } from '../../api/users/event-handlers/handle-user-password-reset-token-requested'

const { cache } = config

const eventsQueue = new Queue('jobs', {
  redis: {
    host: cache.host,
    port: cache.port,
  },
})

eventsQueue.on('completed', (job) => {
  logger.info(`Job ${job.id} completed`)
})

eventsQueue.on('failed', (job, error) => {
  logger.error(`Job ${job.id} failed:`, error)
})

eventsQueue.on('error', (error) => {
  logger.error('Queue error:', error)
})

const listenersMap = {
  [AppEvent.userPasswordResetTokenRequested]:
    handleUserPasswordResetTokenRequested,
  [AppEvent.userPasswordChanged]: handleUserPasswordChanged,
  [AppEvent.userCreated]: handleUserCreated,
  [AppEvent.jobApplicationCreated]: handleJobApplicationCreated,
  [AppEvent.jobApplicationRemoved]: handleJobApplicationRemoved,
  [AppEvent.jobApplicationUpdated]: handleJobApplicationCreated,
  [AppEvent.jobOpeningCreated]: handleJobOpeningCreated,
  [AppEvent.jobOpeningRemoved]: handleJobOpeningRemoved,
  [AppEvent.jobOpeningUpdated]: handleJobOpeningUpdated,
}

Object.entries(listenersMap).forEach(([event, handler]) => {
  eventsQueue.process(event, async (job) => {
    await handler(job.data)
  })
})

export const jobQueueService = {
  async enqueue({
    event,
    payload,
  }: {
    event: AppEvent
    payload: Record<string, unknown>
  }) {
    logger.info(`Enqueueing job: ${event}`)

    try {
      await eventsQueue.add(event, payload, {
        removeOnComplete: true,
        removeOnFail: true,
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 5000,
        },
      })
      logger.info(`Job ${event} enqueued successfully`)
    } catch (error) {
      logger.error(`Error enqueuing job: ${event}`, error)
    }
  },
}
