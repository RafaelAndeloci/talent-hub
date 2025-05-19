import { CreateUserPayloadSchema } from '@talent-hub/shared'
import { z } from 'zod'
export const registerUserRequestSchema = CreateUserPayloadSchema

export type RegisterUserRequest = z.infer<typeof registerUserRequestSchema>
