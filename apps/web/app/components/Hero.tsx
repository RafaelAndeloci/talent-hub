"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function Hero() {
  const { theme } = useTheme();

  return (
    <section className="text-primary-foreground bg-primary to-muted via-accent-foreground dark:via-accent bg-gradient-to-br py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          Comece sua carreira com o Talent Hub
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl">
          Conquiste oportunidades de estágios, empregos de nível de entrada e
          recursos de carreira adaptados para alunos de graduação e
          recém-graduados.
        </p>
        <Button
          size="lg"
          asChild
          variant={theme === "dark" ? "link" : "outline"}
        >
          <Link href="#opportunities">Explore as Oportunidades</Link>
        </Button>
      </div>
    </section>
  );
}
