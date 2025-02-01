/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate =
    (schema: ZodSchema): any =>
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const parsedData = await schema.safeParseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });

            if (!parsedData.success) {
                res.status(400).json({
                    status: 'BAD_REQUEST',
                    code: 400,
                    errors: parsedData.error.errors,
                });

                return;
            }

            req.body = parsedData.data.body;
            req.query = parsedData.data.query;
            req.params = parsedData.data.params;
            next();
        } catch (error) {
            next(error);
        }
    };
