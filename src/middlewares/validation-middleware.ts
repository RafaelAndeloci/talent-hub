import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

const validate =
  (schema: ZodSchema): any =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { success, error, data } = await schema.safeParseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
      file: req.file,
      files: req.files,
    });
    if (!success) {
      return next(error);
    }

    req.body = data.body;
    req.query = data.query;
    req.params = data.params;

    return next();
  };

export default validate;
