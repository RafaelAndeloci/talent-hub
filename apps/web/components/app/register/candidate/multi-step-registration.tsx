"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRegisterCandidate } from "@/contexts/register/candidate";
import { cn } from "@/lib/utils";
import { InterestsForm } from "./interests-form";
import { PersonalInfoForm } from "./personal-info-form";
import { ProfessionalInfoForm } from "./professional-info";

interface MultiStepRegistrationProps {}
export function MultiStepRegistration({}: MultiStepRegistrationProps) {
  const { currentStep, next, previous } = useRegisterCandidate();

  return (
    <Card className="flex min-h-[600px] w-max min-w-[800px] flex-col">
      <CardHeader className="w-full">
        <CardTitle className="text-center text-3xl text-nowrap">
          Crie seu perfil de candidato!
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1">
        {currentStep === "personal-info" && <PersonalInfoForm />}
        {currentStep === "professional-info" && <ProfessionalInfoForm />}
        {currentStep === "interests" && <InterestsForm />}
      </CardContent>
      <CardFooter
        className={cn(
          currentStep !== "personal-info" ? "justify-between" : "justify-end",
        )}
      >
        {currentStep !== "personal-info" && (
          <Button onClick={() => previous()} variant="ghost">
            Voltar
          </Button>
        )}
        <Button onClick={() => next()}>Continuar</Button>
      </CardFooter>
    </Card>
  );
}
