import { NextFunction, Request, Response } from 'express';
import logger from '../services/logging-service';
import * as uuid from 'uuid';

const logging = (req: Request, res: Response, next: NextFunction) => {
  const reqId = req.headers['x-request-id'] = req.headers['x-request-id'] || uuid.v4();

  const timer = logger.startTimer();

  try {
    logger.info(`Req[${reqId}]: ${req.method} ${req.originalUrl}`);
    next();
    logger.info(`Res[${reqId}]: ${res.statusCode}`);
  } catch (error) {
    logger.error(`Req[${reqId}]: ${(error as  any).message}`);
    next(error);
  } finally {
    timer.done({ message: `Req[${reqId}]: completed in` });
  }
};

export default logging;
