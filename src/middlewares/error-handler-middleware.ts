import { NextFunction, Request, Response } from 'express';
import ApiError from '../types/api-error';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { ZodError } from 'zod';
import logger from '../services/logging-service';

const errorHandler = (
  err: unknown,
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ApiError && err.expose) {
    return res.status(err.code).json(err.toJson());
  }

  if (err instanceof TokenExpiredError) {
    return res.status(401).json({
      status: 'Unauthorized',
      code: 401,
      errors: ['Token expired'],
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      status: 'Bad Request',
      code: 400,
      errors: err.errors.map((e) => e.message),
    });
  }

  if (err instanceof JsonWebTokenError) {
    return res.status(401).json({
      status: 'Unauthorized',
      code: 401,
      errors: ['Invalid token'],
    });
  }

  logger.error('Unhandled error:', err);

  res.status(500).json({
    status: 'Internal Server Error',
    code: 500,
    errors: ['Unexpected error'],
  });

  next(); 
};

export default errorHandler;
