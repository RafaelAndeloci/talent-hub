import { z } from "zod";

export enum Role {
  SysAdmin = "sys_admin",
  CompanyRecruiter = "company_recruiter",
  Candidate = "candidate",
  CompanyAdmin = "company_admin",
}

export const CreateUserPayloadSchema = z
  .object({
    username: z.string({
      message: "Preencha o campo.",
    }),
    email: z
      .string({ message: "Preencha o campo." })
      .email({ message: "Email no formato inválido." }),
    password: z.string({ message: "Preencha o campo." }),
    confirmPassword: z.string({ message: "Preencha o campo." }),
    role: z.nativeEnum(Role, { message: "Preencha o campo." }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Senhas não conferem.",
      });
      return false;
    }

    return true;
  });

export type CreateUserPayload = z.infer<typeof CreateUserPayloadSchema>;
