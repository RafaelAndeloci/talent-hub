import { z } from 'zod';
import { YearMonthSchema } from './year-month-schema';

export const PeriodSchema = z
    .object({
        start: YearMonthSchema,
        end: YearMonthSchema.nullable(),
    })
    .refine(
        ({ end, start }) =>
            !end || end.year > start.year || (end.year === start.year && end.month >= start.month),
        {
            message: 'End date must be after or equal to the start date.',
        },
    );
