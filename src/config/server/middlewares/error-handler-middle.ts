import { Request, Response } from 'express';
import ApiError from '../../../shared/errors/api-error';

const errorHandler =
  (requestHandler: (req: Request, res: Response) => Promise<void>) =>
  async (req: Request, res: Response) => {
    try {
      await requestHandler(req, res);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(400).json((error as ApiError).toJson());
        return;
      }

      res.status(500).json({
        code: 500,
        errors: ['Internal server error'],
      });
    }
  };

export default errorHandler;
