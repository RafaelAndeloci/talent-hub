import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BriefcaseBusiness, FileUser, UserRound } from "lucide-react";

export function HowItWorks() {
  return (
    <section className="bg-muted w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-white md:text-4xl">
              Como funciona
            </h2>
            <p className="max-w-[700px] text-white md:text-xl">
              Passos simples para achar a sua oportunidade dos sonhos
            </p>
          </div>
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="flex flex-col items-center text-center"
            >
              <CardHeader className="items-center">
                <div className="bg-primary/10 flex h-20 w-20 items-center justify-center rounded-full">
                  {step.icon}
                </div>
                <CardTitle className="mt-4">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-foreground text-base">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    title: "Crie seu perfil",
    description:
      "Cadastre-se e construa seu perfil de estudante com suas habilidades, experiencia e disponibilidade.",
    icon: <UserRound />,
  },
  {
    title: "Descubra oportunidades",
    description:
      "Procure por vagas que corresponda à sua agenda, interesses e metas de carreira.",
    icon: <BriefcaseBusiness />,
  },
  {
    title: "Se candidate com facilidade",
    description:
      "Envie candidaturas com apenas um clique e acompanhe o status da vaga.",
    icon: <FileUser />,
  },
];
