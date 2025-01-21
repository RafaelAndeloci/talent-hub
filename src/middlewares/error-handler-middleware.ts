import { NextFunction, Request, RequestHandler, Response } from 'express';
import ApiError from '../types/api-error';

const errorHandler = async (
  err: any,
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ApiError && err.expose) {
    res.status(400).json(err.toJson());
    return;
  }

  res.status(500).json({
    status: 'Internal Server Error',
    code: 500,
    errors: ['unexpected error'],
  });
};

export default errorHandler;
