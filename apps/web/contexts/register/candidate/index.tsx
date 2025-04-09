"use client";

import { CreateCandidateRequest } from "@/types/app/register/candidate/create-candidate-request";
import { ContextError } from "@/types/errors/contexts/context-error";
import { createContext, ReactNode, useContext, useState } from "react";

export type FormSteps =
  | "personal-info"
  | "professional-info"
  | "interests"
  | "done";

interface RegisterCandidateContextProps {
  next(cb?: () => void): void;
  previous(cb?: () => void): void;
  goTo(step: FormSteps): void;
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

  function next(cb?: () => void) {
    if (currentStep === "personal-info") {
      setCurrentStep("professional-info");
    } else if (currentStep === "professional-info") {
      setCurrentStep("interests");
    } else if (currentStep === "interests") {
      setCurrentStep("done");
    }
  }
  function previous(cb?: () => void) {
    if (currentStep === "done") {
      setCurrentStep("interests");
    } else if (currentStep === "interests") {
      setCurrentStep("professional-info");
    } else if (currentStep === "professional-info") {
      setCurrentStep("personal-info");
    }
  }

  function beforePrevious() {}
  function beforeNext() {}

  function goTo(step: FormSteps) {
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
        goTo,
        next,
        previous,
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
