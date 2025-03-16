import { ZodSchema } from 'zod';
import { AnyHandler } from '../types/handler';

type ValidationMiddleware = (schema: ZodSchema) => AnyHandler;

export const validate: ValidationMiddleware = (schema) => (req, _, next) => {
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
