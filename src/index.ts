import { initDatabase } from './config/database/database'
import { logger } from './shared/services/logging-service'

const runApplication = async () => {
  try {
    await initDatabase()
    await import('./server')
  } catch (e) {
    logger.error('Error while starting the application', e)
    process.exit(1)
  }
}

runApplication()

process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise} reason: ${reason}`)
  process.exit(1)
})

process.on('uncaughtException', (error) => {
  logger.error(`Uncaught Exception thrown: ${error}`)
  process.exit(1)
})

process.on('SIGINT', () => {
  logger.info('SIGINT signal received.')
  process.exit(0)
})
