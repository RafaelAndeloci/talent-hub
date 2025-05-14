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
                Post your job and reach dedicated students
              </h2>
              <p className="text-muted-foreground max-w-[600px] md:text-xl">
                Connect with motivated college talent looking for part-time
                work, internships, and entry-level positions that match your
                needs.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button size="lg" className="sm:w-auto" asChild>
                <Link
                  href="/register?role=employer"
                  aria-label="Register as an employer"
                >
                  Post a Job
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="sm:w-auto" asChild>
                <Link
                  href="/employer/learn-more"
                  aria-label="Learn more about hiring students"
                >
                  Learn More
                </Link>
              </Button>
            </div>
            <div className="text-muted-foreground flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="font-medium">500+</span> Active Students
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">50+</span> Universities
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">24hr</span> Average Response
              </div>
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
