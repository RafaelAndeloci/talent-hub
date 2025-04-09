import {
  Facebook,
  Instagram,
  LinkedinIcon as LinkedIn,
  Twitter,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Talent Hub</h3>
            <p className="text-sm">
              Empoderando alunos a lançar suas carreiras com confiança.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-primary">
                  Início
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Oportunidades
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Recursos
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Sobre Nós
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Recursos de Alunos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-primary">
                  Construtor de Currículo
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Dicas de Entrevista
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Conselhos de Carreira
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Conecte-se Conosco</h4>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-primary">
                <Facebook />
              </Link>
              <Link href="#" className="hover:text-primary">
                <Twitter />
              </Link>
              <Link href="#" className="hover:text-primary">
                <LinkedIn />
              </Link>
              <Link href="#" className="hover:text-primary">
                <Instagram />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-muted-foreground mt-8 border-t pt-8 text-center text-sm">
          © {new Date().getFullYear()} Talent Hub. Todos os direitos
          reservados.
        </div>
      </div>
    </footer>
  );
}
