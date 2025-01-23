import { NextFunction, Request, Response } from 'express'
import * as uuid from 'uuid'
import { logger } from '../shared/services/logging-service'

export const logging = (req: Request, res: Response, next: NextFunction) => {
  const reqId = (req.headers['x-request-id'] =
    req.headers['x-request-id'] || uuid.v4())

  const timer = logger.startTimer()

  try {
    logger.info(`Req[${reqId}]: ${req.method} ${req.originalUrl}`)
    next()
    logger.info(`Res[${reqId}]: ${res.statusCode}`)
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    logger.error(`Req[${reqId}]: ${(error as any).message}`)
    next(error)
  } finally {
    timer.done({ message: `Req[${reqId}]: completed in` })
  }
}
