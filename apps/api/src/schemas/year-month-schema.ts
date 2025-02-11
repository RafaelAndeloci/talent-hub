import { z } from 'zod';

export const YearMonthSchema = z.object({
    year: z.number().min(1900).max(2100),
    month: z.number().min(1).max(12),
});
