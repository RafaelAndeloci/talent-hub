import { z } from 'zod';
import { Uf } from '../types/uf';

export const AddressSchema = z.object({
    street: z.string(),
    number: z.string(),
    complement: z.string().nullable(),
    neighborhood: z.string(),
    city: z.string(),
    uf: z.nativeEnum(Uf),
    zipCode: z.string().regex(/^\d{8}$/),
});
export type Address = z.infer<typeof AddressSchema>;