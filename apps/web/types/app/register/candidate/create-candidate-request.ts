import { z } from "zod";
export const createCandidateRequestSchema = z.object({});
export type CreateCandidateRequest = z.infer<
  typeof createCandidateRequestSchema
>;
