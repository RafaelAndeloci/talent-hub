import { RegisterForm } from "@/components/app/register/register-form";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import loginImg from "@/public/placeholder.svg";
import { GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface RegisterPageProps {}
export default function RegisterPage({}: RegisterPageProps) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-muted relative hidden lg:block">
        <div className="absolute top-6 left-6 z-10 flex justify-center gap-2 md:top-10 md:left-10 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md">
              <GraduationCap className="size-4" />
            </div>
            Talent Hub
          </Link>
        </div>
        <Image
          src={loginImg}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="relative flex flex-col gap-4 p-6 md:p-10">
        <ThemeToggle className="absolute right-6" />
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
