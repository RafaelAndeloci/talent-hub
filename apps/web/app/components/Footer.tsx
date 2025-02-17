import {
  Facebook,
  Instagram,
  LinkedinIcon as LinkedIn,
  Twitter,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-secondary py-12 text-secondary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Talent Hub</h3>
            <p className="text-sm text-muted-foreground">
              Empoderando alunos a lançar suas carreiras com confiança.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Oportunidades
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Recursos
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Sobre Nós
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Recursos de Alunos</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Construtor de Currículo
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Dicas de Entrevista
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Conselhos de Carreira
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Conecte-se Conosco</h4>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Twitter />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <LinkedIn />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-muted pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Talent Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
