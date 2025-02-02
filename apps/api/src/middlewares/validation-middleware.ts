/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodSchema } from 'zod';

export const validate =
    (schema: ZodSchema): any =>
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
