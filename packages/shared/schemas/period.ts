import { z } from 'zod';
import Schema from '../utils/schema-builder';

export const PeriodSchema = z.object({
    start: Schema.moment(),
    end: Schema.moment().nullable(),
});
export type Period = z.infer<typeof PeriodSchema>;
