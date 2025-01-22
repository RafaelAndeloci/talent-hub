import { NextFunction, Request, Response } from 'express';
import ApiError from '../types/api-error';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { ZodError } from 'zod';
import logger from '../services/logging-service';
import HTTPStatus from 'http-status';

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
    return res.status(HTTPStatus.UNAUTHORIZED).json({
      status: HTTPStatus['401_NAME'],
      code: HTTPStatus.UNAUTHORIZED,
      errors: ['Token expired'],
    });
  }

  if (err instanceof ZodError) {
    return res.status(HTTPStatus.BAD_REQUEST).json({
      status: HTTPStatus['400_NAME'],
      code: HTTPStatus.BAD_REQUEST,
      errors: err.issues.map(issue => ({
        code: issue.code,
        message: issue.message,
        path: issue.path.join('.'),
      })),
    });
  }

  if (err instanceof JsonWebTokenError) {
    return res.status(HTTPStatus.UNAUTHORIZED).json({
      status: HTTPStatus['401_NAME'],
      code: HTTPStatus.UNAUTHORIZED,
      errors: ['invalid token'],
    });
  }

  logger.error('Unhandled error:', err);

  res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
    status: HTTPStatus['500_NAME'],
    code: HTTPStatus.INTERNAL_SERVER_ERROR,
    errors: ['unexpected error'],
  });

  next();
};

export default errorHandler;
