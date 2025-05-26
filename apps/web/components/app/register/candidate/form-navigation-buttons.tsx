'use client'

import { Button } from '@/components/ui/button'
import { useRegisterCandidate } from '@/contexts/register/candidate'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface FormNavigationButtonsProps {
  skip?: boolean
}
export function FormNavigationButtons({
  skip = false,
}: FormNavigationButtonsProps) {
  const { isLastStep, isFirstStep, prevStep, nextStep } = useRegisterCandidate()

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
      <div className="flex items-center gap-3">
        {skip && (
          <Button variant="ghost" onClick={nextStep}>
            Pular
          </Button>
        )}

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
    </div>
  )
}
