import { NextFunction, Request, Response } from 'express';

const logging = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Request URL:', req.originalUrl);
    console.log('Request Type:', req.method);
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default logging;
