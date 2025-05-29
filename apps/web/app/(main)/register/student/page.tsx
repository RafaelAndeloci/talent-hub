import { StudentRegistrationForm } from '@/components/app/register/candidate/registration-form'
import { RegistrationLayout } from '@/components/layouts/registration-layout'
import { RegisterCandidateContextProvider } from '@/contexts/register/candidate'
import {
  BookOpen,
  Briefcase,
  Globe,
  GraduationCap,
  Phone,
  User,
} from 'lucide-react'

export const metadata = {
  title: 'Student Registration | Talent Hub',
  description: 'Complete your student profile to find job opportunities',
}

export default function StudentRegistrationPage() {
  return (
    <RegistrationLayout
      title="Complete Seu Perfil De Candidato"
      subtitle="Nos ajude a encontrar as oportunidades perfeitas para você"
      currentStep={1}
      totalSteps={6}
      steps={[
        { title: 'Pessoal', icon: <User className="size-4" /> },
        { title: 'Contato', icon: <Phone className="size-4" /> },
        { title: 'Preferências', icon: <Briefcase className="size-4" /> },
        { title: 'Formação', icon: <GraduationCap className="size-4" /> },
        { title: 'Profissão', icon: <BookOpen className="size-4" /> },
        { title: 'Habilidades', icon: <Globe className="size-4" /> },
      ]}
    >
      <RegisterCandidateContextProvider>
        <StudentRegistrationForm />
      </RegisterCandidateContextProvider>
    </RegistrationLayout>
  )
}
