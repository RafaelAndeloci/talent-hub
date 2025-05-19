import { z } from 'zod'
export const registerUserResponseSchema = z.object({})
export type RegisterUserResponse = z.infer<typeof registerUserResponseSchema>
