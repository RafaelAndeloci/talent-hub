import { ForgotPasswordForm } from '@/components/app/forgot-password/forgot-password-form'
import { RegistrationLayout } from '@/components/layouts/registration-layout'

export const metadata = {
  title: 'Forgot Password | Talent Hub',
  description: 'Reset your Talent Hub account password',
}

export default function ForgotPasswordPage() {
  return (
    <RegistrationLayout
      title="Forgot Password"
      subtitle="Enter your email to reset your password"
      currentStep={1}
      totalSteps={1}
    >
      <ForgotPasswordForm />
    </RegistrationLayout>
  )
}
