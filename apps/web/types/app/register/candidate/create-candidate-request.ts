import { CandidateSchema } from '@talent-hub/shared'
import { z } from 'zod'

export const createCandidateRequestSchema = CandidateSchema

export type CreateCandidateRequest = z.infer<
  typeof createCandidateRequestSchema
>
