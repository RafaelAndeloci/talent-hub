"use client";

import { CreateCandidateRequest } from "@/types/app/register/candidate/create-candidate-request";
import { ContextError } from "@/types/errors/contexts/context-error";
import { createContext, ReactNode, useContext, useState } from "react";

export type FormSteps =
  | "personal-info"
  | "address-and-contact"
  | "professional-info"
  | "education-info"
  | "experience-and-skills";

interface RegisterCandidateContextProps {
  goToStep(step: FormSteps): void;
  updateFormData(values: Partial<CreateCandidateRequest>): void;
  formData: Partial<CreateCandidateRequest> | undefined;
  currentStep: FormSteps;
}

export const RegisterCandidateContext =
  createContext<RegisterCandidateContextProps | null>(null);

interface RegisterCandidateContextProviderProps {
  children: ReactNode;
}

export function RegisterCandidateContextProvider({
  children,
}: RegisterCandidateContextProviderProps) {
  const [currentStep, setCurrentStep] = useState<FormSteps>("personal-info");
  const [formData, setFormData] =
    useState<Partial<CreateCandidateRequest | undefined>>(undefined);

  function goToStep(step: FormSteps) {
    setCurrentStep(step);
  }

  function updateFormData(values: Partial<CreateCandidateRequest>) {
    if (formData === undefined) {
      setFormData(values);
      return;
    }

    setFormData((prev) => ({ ...prev, ...values }));
  }

  return (
    <RegisterCandidateContext.Provider
      value={{
        goToStep,
        formData,
        updateFormData,
        currentStep,
      }}
    >
      {children}
    </RegisterCandidateContext.Provider>
  );
}

export function useRegisterCandidate() {
  const ctx = useContext(RegisterCandidateContext);

  if (!ctx) {
    throw new ContextError(
      "RegisterCandidateContext",
      useRegisterCandidate.name,
    );
  }

  return ctx;
}
