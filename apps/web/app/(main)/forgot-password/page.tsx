import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import { RegistrationLayoutAlt } from "@/components/layouts/registration-layout-alt"

export const metadata = {
  title: "Forgot Password | Talent Hub",
  description: "Reset your Talent Hub account password",
}

export default function ForgotPasswordPage() {
  return (
    <RegistrationLayoutAlt
      title="Forgot Password"
      subtitle="Enter your email to reset your password"
      currentStep={1}
      totalSteps={1}
    >
      <ForgotPasswordForm />
    </RegistrationLayoutAlt>
  )
}
