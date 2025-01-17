import { z } from 'zod';
import Role from './enums/role';

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
};

export default userSchema;