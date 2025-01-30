import { z } from 'zod';

/**
 * @swagger
 * components:
 *  schemas:
 *   YearMonthSchema:
 *    type: object
 *    properties:
 *      year:
 *       type: integer
 *       minimum: 1900
 *       maximum: 2100
 *       example: 2021
 *      month:
 *        type: integer
 *        minimum: 1
 *        maximum: 12
 *        example: 1
 */
export const YearMonthSchema = z.object({
    year: z.number().min(1900).max(2100),
    month: z.number().min(1).max(12),
});
