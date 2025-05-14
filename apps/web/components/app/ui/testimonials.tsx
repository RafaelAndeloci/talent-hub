import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Quote } from "lucide-react";

export function Testimonials() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Student Success Stories
            </h2>
            <p className="text-muted-foreground max-w-[700px] md:text-xl">
              Hear from students who found valuable opportunities through Talent
              Hub
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full">
              <CardHeader className="pb-2">
                <Quote className="text-muted-foreground h-8 w-8 opacity-50" />
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription className="text-base">
                  "{testimonial.quote}"
                </CardDescription>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1 text-sm">
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    quote:
      "Talent Hub helped me find a part-time job that perfectly fits around my class schedule. The application process was so simple!",
    name: "Alex Johnson",
    role: "Computer Science Major, Junior",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    quote:
      "I found an amazing research internship that aligned with my career goals. It's been invaluable for my resume and graduate school applications.",
    name: "Priya Patel",
    role: "Biology Major, Senior",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    quote:
      "As a first-generation college student, I was nervous about finding work. Talent Hub made it easy to connect with employers who understand student needs.",
    name: "Marcus Williams",
    role: "Business Administration Major, Sophomore",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];
