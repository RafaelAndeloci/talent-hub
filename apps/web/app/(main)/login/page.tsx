import { LoginForm } from "@/components/app/login/login-form";
import { LoginLayout } from "@/components/layouts/login-layout";

export const metadata = {
  title: "Login | Talent Hub",
  description: "Entre na sua conta do Talent Hub",
};

export default function LoginPage() {
  return (
    <LoginLayout
      title="Bem vindo de volta"
      subtitle="Entre na sua conta do Talent Hub"
      currentStep={1}
      totalSteps={1}
    >
      <LoginForm />
    </LoginLayout>
  );
}
