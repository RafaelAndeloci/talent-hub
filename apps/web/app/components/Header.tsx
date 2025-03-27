import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-background shadow-xs">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Button variant="ghost" asChild>
          <Link
            href="/"
            className="text-primary flex items-center gap-2 !text-2xl font-bold"
          >
            <GraduationCap className="size-6" />
            Talent Hub
          </Link>
        </Button>
        <nav className="hidden space-x-4 md:flex">
          <Button asChild variant="link">
            <Link href="#opportunities">Oportunidades</Link>
          </Button>

          <Button asChild variant="link">
            <Link href="#features">Recursos</Link>
          </Button>

          <Button asChild variant="link">
            <Link href="#resources">Recursos</Link>
          </Button>
        </nav>
        <div className="flex space-x-2">
          <ThemeToggle />
          <Button variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Cadastrar</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
