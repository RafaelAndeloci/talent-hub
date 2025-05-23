'use client'

import {
  academicSchema,
  CandidateForm,
  languagesAndSkillsSchema,
  personalInfoSchema,
  preferencesSchema,
  professionalSchema,
} from '@/types/app/register/candidate/form/schemas'
import { ContextError } from '@/types/errors/contexts/context-error'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
export type FormSteps =
  | 'personal'
  | 'preferences'
  | 'academic'
  | 'professional'
  | 'languages'

interface RegisterCandidateContextProps {
  currentStep: FormSteps
  steps: FormSteps[]
  goToStep: (step: FormSteps) => void
  nextStep: () => void
  prevStep: () => void
  isFirstStep: boolean
  isLastStep: boolean
  formData: Partial<CandidateForm>
  setFormData: Dispatch<SetStateAction<Partial<CandidateForm>>>
  getStepSchema: (step: FormSteps) => any
}

export const RegisterCandidateContext =
  createContext<RegisterCandidateContextProps | null>(null)

interface RegisterCandidateContextProviderProps {
  children: ReactNode
}

export function RegisterCandidateContextProvider({
  children,
}: RegisterCandidateContextProviderProps) {
  const [formData, setFormData] = useState<Partial<CandidateForm>>({})
  const [currentStep, setCurrentStep] = useState<FormSteps>('personal')
  const steps: FormSteps[] = [
    'personal',
    'preferences',
    'academic',
    'professional',
    'languages',
  ]

  const currentStepIndex = steps.indexOf(currentStep)
  const isFirstStep = currentStepIndex === 0
  const isLastStep = currentStepIndex === steps.length - 1
  const nextStep = useCallback(() => {
    if (!isLastStep) {
      setCurrentStep(steps[currentStepIndex + 1])
    }
  }, [currentStep, steps])
  const prevStep = useCallback(() => {
    if (!isFirstStep) {
      setCurrentStep(steps[currentStepIndex - 1])
    }
  }, [currentStep, steps])

  const goToStep = (step: FormSteps) => {
    setCurrentStep(step)
  }

  function getCurrentSchemaGeneric(step: FormSteps) {
    switch (step) {
      case 'personal':
        return personalInfoSchema
      case 'academic':
        return academicSchema
      case 'preferences':
        return preferencesSchema
      case 'professional':
        return professionalSchema
      case 'languages':
        return languagesAndSkillsSchema
      default:
        return z.object({})
    }
  }

  const getStepSchema = useCallback(getCurrentSchemaGeneric, [])

  return (
    <RegisterCandidateContext.Provider
      value={{
        currentStep,
        nextStep,
        prevStep,
        steps,
        goToStep,
        formData,
        setFormData,
        isFirstStep,
        isLastStep,
        getStepSchema,
      }}
    >
      {children}
    </RegisterCandidateContext.Provider>
  )
}

export function useRegisterCandidate() {
  const ctx = useContext(RegisterCandidateContext)

  if (!ctx) {
    throw new ContextError(
      'RegisterCandidateContext',
      useRegisterCandidate.name
    )
  }

  return ctx
}

export function useStepForm() {
  const { currentStep, formData, setFormData, getStepSchema, nextStep } =
    useRegisterCandidate()

  const stepSchema = getStepSchema(currentStep)

  const methods = useForm({
    resolver: zodResolver(stepSchema),
    defaultValues: formData,
    mode: 'onChange',
  })

  const onSubmit = (data: Partial<CandidateForm>) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }))
    nextStep()
  }

  return {
    ...methods,
    onSubmit: methods.handleSubmit(onSubmit),
  }
}
