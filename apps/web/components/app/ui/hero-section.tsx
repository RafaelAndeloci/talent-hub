import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="from-background to-muted w-full bg-gradient-to-b py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Find Your Perfect College Job
              </h1>
              <p className="text-muted-foreground max-w-[600px] md:text-xl">
                Connect with employers who understand student schedules. Build
                experience while you study.
              </p>
            </div>

            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <div className="relative flex-1">
                <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search for jobs..."
                  className="w-full pl-8"
                  aria-label="Search for jobs"
                />
              </div>
              <Button type="submit" aria-label="Search for jobs">
                Search
              </Button>
            </div>

            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="flex-1" asChild>
                <Link
                  href="/register?role=student"
                  aria-label="Create a student profile"
                >
                  Create Student Profile
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="flex-1" asChild>
                <Link
                  href="/register?role=employer"
                  aria-label="Post a job as an employer"
                >
                  I'm an Employer
                </Link>
              </Button>
            </div>

            <p className="text-muted-foreground text-sm">
              Join over 10,000 students finding meaningful work opportunities
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
