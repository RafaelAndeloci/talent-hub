import { StudentRegistrationFormAlt } from "@/components/student/registration-form-alt"
import { RegistrationLayoutAlt } from "@/components/layouts/registration-layout-alt"
import { User, Briefcase, GraduationCap, BookOpen, Globe } from "lucide-react"

export const metadata = {
  title: "Student Registration | Talent Hub",
  description: "Complete your student profile to find job opportunities",
}

export default function StudentRegistrationPage() {
  return (
    <RegistrationLayoutAlt
      title="Complete Your Student Profile"
      subtitle="Help us match you with the perfect opportunities"
      currentStep={2}
      totalSteps={6}
      steps={[
        { title: "Account", icon: <span className="text-xs font-medium">1</span> },
        { title: "Personal", icon: <User className="h-4 w-4" /> },
        { title: "Preferences", icon: <Briefcase className="h-4 w-4" /> },
        { title: "Academic", icon: <GraduationCap className="h-4 w-4" /> },
        { title: "Professional", icon: <BookOpen className="h-4 w-4" /> },
        { title: "Skills", icon: <Globe className="h-4 w-4" /> },
      ]}
    >
      <StudentRegistrationFormAlt />
    </RegistrationLayoutAlt>
  )
}
