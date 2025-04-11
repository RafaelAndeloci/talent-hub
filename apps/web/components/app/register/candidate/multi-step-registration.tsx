"use client";

import {
  AddressAndContactForm,
  EducationInfoForm,
  ExperienceAndSkillsForm,
  PersonalInfoForm,
  ProfessionalInfoForm,
} from "@/components/app/register/candidate";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useRegisterCandidate } from "@/contexts/register/candidate";

interface MultiStepRegistrationProps {}
export function MultiStepRegistration({}: MultiStepRegistrationProps) {
  const { currentStep } = useRegisterCandidate();

  return (
    <Card className="flex min-h-[600px] w-full min-w-screen flex-col border-0 shadow-none lg:w-max lg:min-w-[800px] lg:border lg:shadow-sm">
      <CardHeader className="w-full">
        <CardTitle className="text-center text-3xl lg:text-nowrap">
          Crie seu perfil de candidato!
        </CardTitle>
      </CardHeader>
      {currentStep === "personal-info" && <PersonalInfoForm />}
      {currentStep === "address-and-contact" && <AddressAndContactForm />}
      {currentStep === "professional-info" && <ProfessionalInfoForm />}
      {currentStep === "education-info" && <EducationInfoForm />}
      {currentStep === "experience-and-skills" && <ExperienceAndSkillsForm />}
    </Card>
  );
}
