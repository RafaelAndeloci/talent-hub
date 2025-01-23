import { z } from 'zod'
import { Contact } from '../types/contact'

export const ContactSchema: z.ZodType<Contact> = z.object({
  email: z.string().email(),
  phone: z.string().regex(/^\+?[0-9]{11}$/),
})
