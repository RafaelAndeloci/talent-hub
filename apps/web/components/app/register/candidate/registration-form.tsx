'use client'

import { Button } from '@/components/ui/button'
import { useRegisterCandidate } from '@/contexts/register/candidate'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { AcademicStep } from './academic-step'
import { LanguagesStep } from './languages-step'
import { PersonalStep } from './personal-step'
import { PreferencesStep } from './preferences-step'
import { ProfessionalStep } from './professional-step'

export function StudentRegistrationForm() {
  const { steps, currentStep, prevStep, nextStep, isFirstStep, isLastStep } =
    useRegisterCandidate()
  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {currentStep === 'personal' && <PersonalStep />}
        {currentStep === 'preferences' && <PreferencesStep />}
        {currentStep === 'academic' && <AcademicStep />}
        {currentStep === 'professional' && <ProfessionalStep />}
        {currentStep === 'languages' && <LanguagesStep />}

        <div className="flex justify-between pt-4">
          <Button
            type="button"
            className="group"
            variant="outline"
            onClick={prevStep}
            disabled={isFirstStep}
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            Voltar
          </Button>
          <Button onClick={nextStep} className="group">
            {isLastStep ? (
              'Complete Registration'
            ) : (
              <>
                Próximo
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
