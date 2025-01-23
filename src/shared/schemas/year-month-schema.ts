import { z } from 'zod'
import { YearMonth } from '../types/year-month'

export const YearMonthSchema: z.ZodType<YearMonth> = z.object({
  year: z.number().min(1900).max(2100),
  month: z.number().min(1).max(12),
})
