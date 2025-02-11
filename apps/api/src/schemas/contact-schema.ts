import { Contact } from '@talent-hub/shared';
import { z } from 'zod';

export const ContactSchema: z.ZodType<Contact> = z.object({
    email: z.string().email(),
    phone: z.string().regex(/^\+?[0-9]{11}$/),
});
