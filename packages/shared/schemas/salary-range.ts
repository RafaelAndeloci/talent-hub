import { z } from 'zod';

export const SalaryRangeSchema = z.object({
    min: z.number().int().positive().min(0),
    max: z.number().int().positive().min(0),
});

export type SalaryRange = z.infer<typeof SalaryRangeSchema>;