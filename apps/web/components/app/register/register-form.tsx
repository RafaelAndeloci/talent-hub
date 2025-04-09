"use client";

import { createUserAction } from "@/actions/register/register-user";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
enum Role {
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

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const form = useForm<CreateUserPayload>({
    resolver: zodResolver(CreateUserPayloadSchema),
    defaultValues: {
      role: Role.Candidate,
    },
  });
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isValid = form.formState.isValid;

  function handleCreateUser(data: CreateUserPayload) {
    const { role } = data;

    startTransition(async () => {
      const response = await createUserAction(data);

      if (!response.success) {
        toast("Erro ao tentar criar o usuário.", {
          description: response.error.message,
        });
        return;
      }
    });

    switch (role) {
      case Role.Candidate:
        router.push("/register/candidate");
        break;
      case Role.CompanyRecruiter:
        router.push("/register/recruiter");
        break;

      default:
        form.setError(
          "role",
          { message: "Informe uma opção válida" },
          { shouldFocus: true },
        );
        break;
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateUser)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Crie sua conta</h1>
          <p className="text-foreground text-sm text-balance">
            Digite os campos abaixo para prosseguir
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <FormField
              name="email"
              control={form.control}
              render={({ field: { value = "", ...field } }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="email">
                      Email
                      <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@doe.com"
                        autoComplete="email"
                        value={value}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              name="username"
              control={form.control}
              render={({ field: { value = "", ...field } }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="username">
                      Nome de usuário <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="username"
                        type="text"
                        placeholder="john_doe123"
                        value={value}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              name="password"
              control={form.control}
              render={({ field: { value = "", ...field } }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="password">
                      Senha <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        placeholder="******"
                        autoComplete="new-password"
                        value={value}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field: { value = "", ...field } }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="confirm-password">
                      Confirmar senha
                      <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="******"
                        autoComplete="new-password"
                        value={value}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              name="role"
              control={form.control}
              render={({ field: { name, onChange, value = "candidate" } }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="role">
                      No momento estou
                      <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={value}
                        onValueChange={onChange}
                        name={name}
                        defaultValue="candidate"
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione uma opção" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="candidate">
                              Buscando vagas
                            </SelectItem>
                            <SelectItem value="company_recruiter">
                              Recrutando candidatos
                            </SelectItem>

                            <SelectItem value="company_admin">
                              Gerenciando uma empresa
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                );
              }}
            />

            <Label htmlFor="role">No momento estou</Label>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isPending || !isValid}
          >
            {isPending ? <Loader2Icon className="animate-spin" /> : "Entrar"}
          </Button>
        </div>
        <div className="flex gap-1 text-center text-sm">
          Já tem uma conta?
          <Link href="/login" className="underline underline-offset-4">
            Entre por aqui
          </Link>
        </div>
      </form>
    </Form>
  );
}
