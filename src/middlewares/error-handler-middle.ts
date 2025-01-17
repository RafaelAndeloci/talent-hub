import { NextFunction, Request, RequestHandler, Response } from 'express';
import ApiError from '../types/api-error';

const errorHandlerWrapper =
  (requestHandler: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await requestHandler(req, res, next);
    } catch (error) {
      console.error(error);
      
      if (error instanceof ApiError && error.expose) {
        res.status(400).json((error as ApiError).toJson());
        return;
      }

      res.status(500).json({
        status: 'Internal Server Error',
        code: 500,
        errors: ['unexpected error'],
      });
    }
  };

export default errorHandlerWrapper;
