import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function EmployerCTA() {
  return (
    <section className="bg-primary/5 w-full border-y py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Anuncie sua vaga e alcance estudantes dedicados
              </h2>
              <p className="text-foreground max-w-[600px] md:text-xl">
                Se conecte com talentos motivados procurando por trabalhos de
                meio período, estágio ou níveis baixos que corresponda às suas
                necessidades
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button size="lg" className="sm:w-auto" asChild>
                <Link
                  href="/register?role=employer"
                  aria-label="Register as an employer"
                >
                  Anuncie uma vaga
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="sm:w-auto" asChild>
                <Link
                  href="/employer/learn-more"
                  aria-label="Learn more about hiring students"
                >
                  Saiba mais
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=300&width=400"
              alt="Employers connecting with students"
              width={400}
              height={300}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
