import { z } from 'zod';

export const ContactSchema = z.object({
    email: z.string().email(),
    phone: z.string().regex(/^\d{11}$/),
});

export type Contact = z.infer<typeof ContactSchema>;