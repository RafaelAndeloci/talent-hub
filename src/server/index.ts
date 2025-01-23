import express from 'express'
import methodOverride from 'method-override'
import { errorHandler } from '../middlewares/error-handler-middleware'
import { logging } from '../middlewares/logging-middleware'
import { logger } from '../shared/services/logging-service'
import { apiRoutes, staticRoutes } from './routes'
import { config } from '../config/environment'

const {
  api: { host, port },
} = config

const app = express()

app.use(logging)
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  }),
)
app.use(methodOverride())
app.use('/api', apiRoutes)
app.use('/static', staticRoutes)
app.use(errorHandler)

app.listen(port, host, () => {
  logger.info(`Server is running at http://${host}:${port}`)
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.on('error', (error: any) => {
  logger.error(error)
})

app.on('close', () => {
  logger.info('Server is closing')
})

export default app
