"use client";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { RegisterCandidateContextProvider } from "@/contexts/register/candidate";
import * as motion from "motion/react-client";
import { MultiStepRegistration } from "./multi-step-registration";

interface RegisterCandidateFlowProps {}
export function RegisterCandidateFlow({}: RegisterCandidateFlowProps) {
  return (
    <div className="flex h-full w-full items-center justify-center py-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 200 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.4,
          scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        }}
      >
        <RegisterCandidateContextProvider>
          <MultiStepRegistration />
        </RegisterCandidateContextProvider>
      </motion.div>
      <ThemeToggle
        className="fixed bottom-6 left-6 rounded-full"
        variant="secondary"
      />
    </div>
  );
}
