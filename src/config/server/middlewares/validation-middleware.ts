import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

const validate =
  (schema: ZodSchema): any =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      req.body = parsed.body;
      req.query = parsed.query;
      req.params = parsed.params;

      next();
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({
          message: 'Validation error',
          errors: (err as any).errors,
        });
      }
      next(err);
    }
  };

export default validate;
