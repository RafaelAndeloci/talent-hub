import { z } from 'zod'
import { Role } from './types/enums/role'

export const CreateUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/),
    username: z.string().min(3).max(20),
    role: z.enum(
      Object.freeze(Object.values(Role)) as readonly [string, ...string[]],
    ),
  }),
})

export const AuthSchema = z.object({
  body: z
    .object({
      email: z.string().email().optional(),
      password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/),
      username: z.string().min(3).max(20).optional(),
    })
    .refine((data) => !!data.email || !!data.username, {
      message: 'email or username is required',
    }),
})
