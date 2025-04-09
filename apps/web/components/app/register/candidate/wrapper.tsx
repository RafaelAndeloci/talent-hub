"use client";

import { RegisterCandidateContextProvider } from "@/contexts/register/candidate";
import * as motion from "motion/react-client";
import { MultiStepRegistration } from "./multi-step-registration";

interface RegisterCandidateFlowProps {}
export function RegisterCandidateFlow({}: RegisterCandidateFlowProps) {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden">
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
    </div>
  );
}
