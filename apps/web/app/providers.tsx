import { ThemeProvider } from "@/components/theme/theme-provider";
import { ReactNode } from "react";

interface ProvidersProps {
  children?: ReactNode;
}
export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
