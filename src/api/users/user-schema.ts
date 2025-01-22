import { Role } from '@prisma/client';
import { z } from 'zod';
import schemaBuilder from '../../utils/schema-builder';
import config from '../../config/environment';
  
const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/;

const userSchema = {
  create: z.object({
    body: z.object({
      email: z.string().email({
        message: 'Endereço de e-mail inválido.',
      }),
      password: z.string().regex(passwordRule, {
        message:
          'A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um número.',
      }),
      role: z.nativeEnum(Role),
    }),
  }),

  auth: z.object({
    body: z.object({
      email: z.string().email({
        message: 'Endereço de e-mail inválido.',
      }),
      password: z.string().regex(passwordRule, {
        message:
          'A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um número.',
      }),
    }),
  }),

  findById: z.object({
    params: z.object({
      id: z.string().uuid(),
    }),
  }),

  findAll: z.object({
    query: schemaBuilder.buildQuery({
      searchFields: ['role', 'email'],
      sortingFields: ['role', 'email', 'updatedAt'],
    }),
  }),

  updateProfilePicture: z.object({
    file: z.object({
      mimetype: z
        .string()
        .refine(value => config.allowedMimeTypes.images.includes(value)),
    }),
  }),
};

export default userSchema;
