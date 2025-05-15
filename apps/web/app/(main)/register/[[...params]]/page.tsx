import { RegisterForm } from "@/components/app/register/register-form";
import { RegistrationLayout } from "@/components/layouts/registration-layout";
import { UserPen, UserRound } from "lucide-react";

export const metadata = {
  title: "Cadastrar | Talent Hub",
  description:
    "Crie uma conta no Talent Hub para achar vagas ou anunciar oportunidades",
};

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string; redirect?: string }>;
}) {
  // Pre-select role based on query parameter
  const { redirect, role } = await searchParams;
  const defaultRole =
    role === "employer"
      ? "employer"
      : role === "student"
        ? "student"
        : undefined;
  const redirectPath = redirect || "";

  return (
    <RegistrationLayout
      title="Junte-se ao Talent Hub"
      subtitle="Crie sua conta para iniciar"
      currentStep={1}
      totalSteps={2}
      steps={[
        {
          title: "Conta",
          icon: <UserRound className="size-5" />,
        },
        {
          title: "Perfil",
          icon: <UserPen className="size-5" />,
        },
      ]}
    >
      <RegisterForm defaultRole={defaultRole} redirectPath={redirectPath} />
    </RegistrationLayout>
  );
}
