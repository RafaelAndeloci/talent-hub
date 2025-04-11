"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { ComponentPropsWithoutRef } from "react";

export function ThemeToggle({
  className,
  variant = "ghost",
  size = "icon",
  ...props
}: ComponentPropsWithoutRef<typeof Button>) {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={(e) => {
        props.onClick?.(e);
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      className={cn("h-9 w-9 rounded-md", className)}
      aria-label="Toggle theme"
      {...props}
    >
      <Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
