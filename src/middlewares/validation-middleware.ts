import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

const validate =
  (schema: ZodSchema): any =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { success, error, data } = await schema.safeParseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (success) {
      req.body = data.body;
      req.query = data.query;
      req.params = data.params;

      return next();
    }

    return res.status(400).json({
      code: 400,
      message: 'Validation error',
      errors: error.errors,
    });
  };

export default validate;
