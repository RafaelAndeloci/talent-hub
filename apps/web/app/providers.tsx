import { Toast, ToastProvider } from "@/components/ui/toast";
import { ReactNode } from "react";

interface ProvidersProps {
  children?: ReactNode;
}
export function Providers({ children }: ProvidersProps) {
  return <ToastProvider>{children}</ToastProvider>;
}
