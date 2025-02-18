import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-background shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-primary"
        >
          <GraduationCap className="size-6" />
          Talent Hub
        </Link>
        <nav className="hidden space-x-4 md:flex">
          <Link
            href="#opportunities"
            className="text-muted-foreground hover:text-primary"
          >
            Oportunidades
          </Link>
          <Link
            href="#features"
            className="text-muted-foreground hover:text-primary"
          >
            Recursos
          </Link>
          <Link
            href="#resources"
            className="text-muted-foreground hover:text-primary"
          >
            Recursos
          </Link>
        </nav>
        <div className="flex space-x-2">
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
