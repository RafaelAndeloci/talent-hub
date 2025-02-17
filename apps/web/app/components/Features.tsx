import { Briefcase, TrendingUp, Users, Zap } from "lucide-react";

const features = [
  {
    icon: Briefcase,
    title: "Encontre estágios",
    description:
      "Encontre estágios e empregos de nível de entrada que combinam com sua formação e objetivos de carreira.",
  },
  {
    icon: Zap,
    title: "Aplique rapidamente",
    description:
      "Aplique a várias oportunidades com um único clique, economizando tempo para seus estudos e vida acadêmica.",
  },
  {
    icon: Users,
    title: "Conecte-se com mentores",
    description:
      "Encontre mentores que compartilham de sua formação e experiência para guiar você na conquista de seu sonho de carreira.",
  },
  {
    icon: TrendingUp,
    title: "Busca otimizada com IA",
    description:
      "Busque oportunidades de estágios e empregos de nível de entrada com um algorítmo otimizado que encaixe melhor com o seu perfil com a IA.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-secondary py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Por que o Talent Hub é a melhor escolha para você
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="rounded-lg bg-background p-6 shadow-md">
              <feature.icon className="mb-4 h-12 w-12 text-primary" />
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
