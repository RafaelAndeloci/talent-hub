"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { useRegisterCandidate } from "@/contexts/register/candidate";

export function ProfessionalInfoForm() {
  const { goToStep } = useRegisterCandidate();

  return (
    <>
      <CardContent className="flex flex-1"></CardContent>
      <CardFooter className="flex w-full items-center justify-between gap-2">
        <Button variant="ghost" onClick={() => goToStep("personal-info")}>
          Voltar
        </Button>

        <Button onClick={() => alert("calma calabreso")}>Continuar</Button>
      </CardFooter>
    </>
  );
}
