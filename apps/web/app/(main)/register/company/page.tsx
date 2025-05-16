import { CompanyRegistrationForm } from '@/components/app/register/companies/registration-form'
import { RegistrationLayout } from '@/components/layouts/registration-layout'
import { Building, CheckCircle, Shield, Upload, User } from 'lucide-react'

export const metadata = {
  title: 'Company Registration | Talent Hub',
  description: 'Complete your company profile to post jobs and find talent',
}

export default function CompanyRegistrationPage() {
  return (
    <RegistrationLayout
      title="Complete Your Company Profile"
      subtitle="Set up your company profile to start posting jobs"
      currentStep={2}
      totalSteps={6}
      steps={[
        {
          title: 'Account',
          icon: <span className="text-xs font-medium">1</span>,
        },
        { title: 'Company', icon: <Building className="h-4 w-4" /> },
        { title: 'Contact', icon: <User className="h-4 w-4" /> },
        { title: 'Credentials', icon: <CheckCircle className="h-4 w-4" /> },
        { title: 'Profile', icon: <Upload className="h-4 w-4" /> },
        { title: 'Verification', icon: <Shield className="h-4 w-4" /> },
      ]}
    >
      <CompanyRegistrationForm />
    </RegistrationLayout>
  )
}
