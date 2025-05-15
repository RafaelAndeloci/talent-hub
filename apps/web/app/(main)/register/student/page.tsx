import { StudentRegistrationForm } from "@/components/app/register/candidate/registration-form";
import { RegistrationLayout } from "@/components/layouts/registration-layout";
import { BookOpen, Briefcase, Globe, GraduationCap, User } from "lucide-react";

export const metadata = {
  title: "Student Registration | Talent Hub",
  description: "Complete your student profile to find job opportunities",
};

export default function StudentRegistrationPage() {
  return (
    <RegistrationLayout
      title="Complete Seu Perfil De Estudante"
      subtitle="Nos ajude a encontrar as oportunidades perfeitas para você"
      currentStep={2}
      totalSteps={6}
      steps={[
        {
          title: "Conta",
          icon: <span className="text-xs font-medium">1</span>,
        },
        { title: "Pessoal", icon: <User className="h-4 w-4" /> },
        { title: "Preferências", icon: <Briefcase className="h-4 w-4" /> },
        { title: "Formação", icon: <GraduationCap className="h-4 w-4" /> },
        { title: "Profissão", icon: <BookOpen className="h-4 w-4" /> },
        { title: "Habilidades", icon: <Globe className="h-4 w-4" /> },
      ]}
    >
      <StudentRegistrationForm />
    </RegistrationLayout>
  );
}
