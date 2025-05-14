import { EmployerRegistrationForm } from "@/components/employer/registration-form"
import { RegistrationLayoutAlt } from "@/components/layouts/registration-layout-alt"
import { Building, User, CheckCircle, Upload, Shield } from "lucide-react"

export const metadata = {
  title: "Employer Registration | Talent Hub",
  description: "Complete your employer profile to post jobs and find talent",
}

export default function EmployerRegistrationPage() {
  return (
    <RegistrationLayoutAlt
      title="Complete Your Employer Profile"
      subtitle="Set up your company profile to start posting jobs"
      currentStep={2}
      totalSteps={6}
      steps={[
        { title: "Account", icon: <span className="text-xs font-medium">1</span> },
        { title: "Company", icon: <Building className="h-4 w-4" /> },
        { title: "Contact", icon: <User className="h-4 w-4" /> },
        { title: "Credentials", icon: <CheckCircle className="h-4 w-4" /> },
        { title: "Profile", icon: <Upload className="h-4 w-4" /> },
        { title: "Verification", icon: <Shield className="h-4 w-4" /> },
      ]}
    >
      <EmployerRegistrationForm />
    </RegistrationLayoutAlt>
  )
}
