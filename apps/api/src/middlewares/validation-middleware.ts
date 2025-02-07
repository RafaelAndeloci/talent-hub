/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodSchema } from 'zod';
import { MiddlewareFactory } from '../types/middleware-factory';

export const validate: MiddlewareFactory<ZodSchema> =
    (schema: ZodSchema) =>
    (req: any, _res: any, next: any): void => {
        try {
            const { body, query, params } = schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
                file: { buffer: req.file?.buffer, mimetype: req.file?.mimetype },
            });

            req.body = body;
            req.query = query;
            req.params = params;
            next();
        } catch (error) {
            next(error);
        }
    };
