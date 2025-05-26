'use client'

import { Button } from '@/components/ui/button'
import { useRegisterCandidate } from '@/contexts/register/candidate'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface FormNavigationButtonsProps {}
export function FormNavigationButtons({}: FormNavigationButtonsProps) {
  const { isLastStep, isFirstStep, prevStep } = useRegisterCandidate()

  return (
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
      <Button className="group" type="submit">
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
  )
}
