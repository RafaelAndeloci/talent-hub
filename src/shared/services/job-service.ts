import Queue from 'bull'
import { config } from '../../config/environment'
import { AppEvent } from '../enums/app-event'
import { handleUserPasswordReset } from '../../api/users/event-handlers/user-password-reset-job'
import { logger } from './logging-service'

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
  [AppEvent.UserResetPassword]: handleUserPasswordReset,
}

Object.entries(listenersMap).forEach(([event, handler]) => {
  eventsQueue.process(event, async (job) => {
    const { userId } = job.data
    await handler(userId)
  })
})

export const jobService = {
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
      throw error
    }
  },
}
