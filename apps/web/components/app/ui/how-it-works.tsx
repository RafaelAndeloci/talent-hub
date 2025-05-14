import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export function HowItWorks() {
  return (
    <section className="bg-muted w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              How Talent Hub Works
            </h2>
            <p className="text-muted-foreground max-w-[700px] md:text-xl">
              Simple steps to find the perfect job that fits your college
              schedule
            </p>
          </div>
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="flex flex-col items-center text-center"
            >
              <CardHeader>
                <div className="bg-primary/10 flex h-20 w-20 items-center justify-center rounded-full">
                  <Image
                    src={step.icon || "/placeholder.svg"}
                    alt={`Step ${index + 1} icon`}
                    width={40}
                    height={40}
                    className="h-10 w-10"
                  />
                </div>
                <CardTitle className="mt-4">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
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
    title: "Create Your Profile",
    description:
      "Sign up and build your student profile with your skills, experience, and availability.",
    icon: "/placeholder.svg?height=40&width=40",
  },
  {
    title: "Discover Opportunities",
    description:
      "Browse jobs that match your schedule, interests, and career goals.",
    icon: "/placeholder.svg?height=40&width=40",
  },
  {
    title: "Apply With Ease",
    description:
      "Submit applications with one click and track your application status.",
    icon: "/placeholder.svg?height=40&width=40",
  },
];
