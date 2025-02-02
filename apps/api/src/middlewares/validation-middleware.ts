/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate =
    (schema: ZodSchema): any =>
    (req: Request, _res: Response, next: NextFunction): void => {
        try {
            const { body, query, params } = schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
                file: (req as any).file ?? {},
            });

            req.body = body;
            req.query = query;
            req.params = params;
            next();
        } catch (error) {
            next(error);
        }
    };
