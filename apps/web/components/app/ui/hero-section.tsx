import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="from-background w-full bg-gradient-to-b to-neutral-300 py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Ache sua vaga perfeita
              </h1>
              <p className="text-foreground max-w-[600px] md:text-xl">
                Se conecte com empresas que estão buscando estudantes como você
              </p>
            </div>

            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <div className="relative flex-1">
                <Search className="text-foreground absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2" />
                <Input
                  type="search"
                  placeholder="Procure por vagas..."
                  className="w-full pl-8"
                  aria-label="Procure por vagas..."
                />
              </div>
              <Button type="submit" aria-label="Procure por vagas...">
                Procurar
              </Button>
            </div>

            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="flex-1" asChild>
                <Link
                  href="/register?role=student"
                  aria-label="Criar um perfil de estudante"
                >
                  Criar um perfil de estudante
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="flex-1" asChild>
                <Link
                  href="/register?role=employer"
                  aria-label="Eu estou contratando"
                >
                  Estou contratando
                </Link>
              </Button>
            </div>

            <p className="text-foreground text-sm">
              Junte-se a estudantes de outras faculdades e ache oportunidades
              incríveis
            </p>
          </div>

          <div className="flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=400&width=500"
              alt="Students finding jobs illustration"
              width={500}
              height={400}
              className="rounded-lg object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
