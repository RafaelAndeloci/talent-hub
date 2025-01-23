import { Address } from '../types/address'
import { z } from 'zod'
import { Uf } from '../enums/uf'

export const AddressSchema: z.ZodType<Address> = z.object({
  street: z.string().max(100),
  number: z.string().regex(/^\d{1,15}$/),
  complement: z.string().max(100).nullable(),
  neighborhood: z.string().max(100),
  city: z.string().max(100),
  uf: z.nativeEnum(Uf),
  zipCode: z.string().regex(/^\d{8}$/),
})
