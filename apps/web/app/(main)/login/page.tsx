import { LoginForm } from "@/components/auth/login-form"
import { RegistrationLayoutAlt } from "@/components/layouts/registration-layout-alt"

export const metadata = {
  title: "Login | Talent Hub",
  description: "Log in to your Talent Hub account",
}

export default function LoginPage() {
  return (
    <RegistrationLayoutAlt
      title="Welcome Back"
      subtitle="Log in to your Talent Hub account"
      currentStep={1}
      totalSteps={1}
    >
      <LoginForm />
    </RegistrationLayoutAlt>
  )
}
