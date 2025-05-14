import {
  Facebook,
  GraduationCap,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background w-full border-t">
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="flex flex-col gap-2 lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2"
              aria-label="Talent Hub Home"
            >
              <GraduationCap className="size-8 rounded" />
              <span className="text-xl font-bold">Talent Hub</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Conectando candidatos com oportunidades profissionais que
              impulsionam carreiras
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Para candidatos</h3>
            <nav className="flex flex-col gap-2" aria-label="Student resources">
              <Link
                href="/browse-jobs"
                className="text-muted-foreground hover:text-primary text-sm"
              >
                Procure por vagas
              </Link>
              <Link
                href="/create-profile"
                className="text-muted-foreground hover:text-primary text-sm"
              >
                Crie seu perfil
              </Link>
              <Link
                href="/career-resources"
                className="text-muted-foreground hover:text-primary text-sm"
              >
                Recursos
              </Link>
              <Link
                href="/resume-tips"
                className="text-muted-foreground hover:text-primary text-sm"
              >
                Dicas de currículo
              </Link>
            </nav>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Para empresas</h3>
            <nav
              className="flex flex-col gap-2"
              aria-label="Employer resources"
            >
              <Link
                href="/post-job"
                className="text-muted-foreground hover:text-primary text-sm"
              >
                Anuncie uma vaga
              </Link>
              <Link
                href="/browse-students"
                className="text-muted-foreground hover:text-primary text-sm"
              >
                Procure candidatos
              </Link>
              <Link
                href="/employer-resources"
                className="text-muted-foreground hover:text-primary text-sm"
              >
                Resources
              </Link>
            </nav>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Company</h3>
            <nav
              className="flex flex-col gap-2"
              aria-label="Company information"
            >
              <Link
                href="/about"
                className="text-muted-foreground hover:text-primary text-sm"
              >
                Sobre nós
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-primary text-sm"
              >
                Contato
              </Link>
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-primary text-sm"
              >
                Política de privacidade
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-primary text-sm"
              >
                Termos de serviço
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-4">
            <Link href="#" aria-label="Facebook">
              <Facebook className="text-muted-foreground hover:text-primary h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <Twitter className="text-muted-foreground hover:text-primary h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram className="text-muted-foreground hover:text-primary h-5 w-5" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="text-muted-foreground hover:text-primary h-5 w-5" />
            </Link>
          </div>
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Talent Hub. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
