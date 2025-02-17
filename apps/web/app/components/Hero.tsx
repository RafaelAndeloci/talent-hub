import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-primary py-20 text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          Começe sua carreira com o Talent Hub
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl">
          Conquiste oportunidades de estágios, empregos de nível de entrada e
          recursos de carreira adaptados para alunos de graduação e
          recém-graduados.
        </p>
        <Button
          size="lg"
          className="bg-background text-primary hover:bg-secondary"
          asChild
        >
          <Link href="#opportunities">Explore as Oportunidades</Link>
        </Button>
      </div>
    </section>
  );
}
