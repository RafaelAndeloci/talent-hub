import { z } from 'zod';

/**
 * @swagger
 * components:
 *  schemas:
 *    ParamsSchema:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 */
export const ParamsSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
});
