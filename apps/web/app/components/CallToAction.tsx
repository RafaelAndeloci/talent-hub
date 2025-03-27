import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-4 text-3xl font-bold">
          Pronto para lançar sua carreira?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-xl">
          Junte-se a milhares de alunos que encontraram estágios incríveis e
          oportunidades de nível de entrada através do Talent Hub.
        </p>
        <Button size="lg" variant="outline" asChild>
          <Link href="/register">Crie seu perfil</Link>
        </Button>
      </div>
    </section>
  );
}
