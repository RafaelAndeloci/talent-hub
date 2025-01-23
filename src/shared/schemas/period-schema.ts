import { z } from 'zod'
import { YearMonthSchema } from './year-month-schema'
import { Period } from '../types/period'

export const PeriodSchema: z.ZodType<Period> = z.object({
  start: YearMonthSchema,
  end: YearMonthSchema.nullable(),
})
