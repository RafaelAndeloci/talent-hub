import { z } from 'zod'
export const loginResponseSchema = z.object({
  accessToken: z.string(),
  tokenType: z.string(),
  expiresIn: z.number(),
})

export type LoginResponse = z.infer<typeof loginResponseSchema>
