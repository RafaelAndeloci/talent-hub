'use client'

import { useRegisterCandidate } from '@/contexts/register/candidate'
import { AcademicStep } from './academic-step'
import { ContactStep } from './contact-step'
import { LanguagesStep } from './languages-step'
import { PersonalStep } from './personal-step'
import { PreferencesStep } from './preferences-step'
import { ProfessionalStep } from './professional-step'

export function StudentRegistrationForm() {
  const { currentStep } = useRegisterCandidate()
  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {currentStep === 'personal' && <PersonalStep />}
        {currentStep === 'contactAddress' && <ContactStep />}
        {currentStep === 'preferences' && <PreferencesStep />}
        {currentStep === 'academic' && <AcademicStep />}
        {currentStep === 'professional' && <ProfessionalStep />}
        {currentStep === 'languages' && <LanguagesStep />}
      </div>
    </div>
  )
}
