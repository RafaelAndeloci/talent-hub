"use client";

import { cn } from "@/lib/utils";
import * as motion from "motion/react-client";
import { ComponentPropsWithoutRef } from "react";
import { Button } from "../button";
interface AnimatedButtonProps extends ComponentPropsWithoutRef<typeof Button> {
  custom: any;
}

export function AnimatedButton({
  className,
  custom,
  ...props
}: AnimatedButtonProps) {
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

  return (
    <motion.div
      className={cn("", className)}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      custom={custom}
    >
      <Button {...props} />
    </motion.div>
  );
}
