"use client";

import { cn } from "@/lib/utils";
import * as motion from "motion/react-client";
import { ComponentPropsWithoutRef } from "react";
import { Input } from "../input";
interface AnimatedInputProps extends ComponentPropsWithoutRef<typeof Input> {
  custom: any;
  variants?: any;
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => {
    const delay = i * 0.1;
    return {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.3,
        bounce: 0,
      },
    };
  },
};

export function AnimatedInput({
  className,
  custom,
  variants = itemVariants,
  ...props
}: AnimatedInputProps) {
  return (
    <motion.div
      className={cn("", className)}
      variants={variants}
      initial="hidden"
      animate="visible"
      custom={custom}
    >
      <Input {...props} />
    </motion.div>
  );
}
