import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function FeaturedJobs() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Featured Opportunities
            </h2>
            <p className="text-muted-foreground max-w-[700px] md:text-xl">
              Discover jobs and internships that fit your schedule and career
              goals
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredJobs.map((job) => (
            <Card key={job.id} className="flex flex-col">
              <CardHeader className="flex flex-row items-start gap-4 pb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border">
                  <Image
                    src={job.companyLogo || "/placeholder.svg"}
                    alt={`${job.company} logo`}
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded"
                  />
                </div>
                <div className="grid gap-1">
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription>{job.company}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-col gap-2 text-sm">
                  <div className="text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{job.type}</span>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span>{job.category}</span>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link
                    href={`/jobs/${job.id}`}
                    aria-label={`View details for ${job.title} at ${job.company}`}
                  >
                    View Details
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/jobs" aria-label="Browse all job listings">
              View All Jobs
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

const featuredJobs = [
  {
    id: "1",
    title: "Marketing Assistant",
    company: "TechStart Inc.",
    companyLogo: "/placeholder.svg?height=32&width=32",
    location: "Remote",
    type: "Part-time",
    category: "Marketing",
    tags: ["Social Media", "Content Creation", "Flexible Hours"],
  },
  {
    id: "2",
    title: "Research Intern",
    company: "BioLabs",
    companyLogo: "/placeholder.svg?height=32&width=32",
    location: "Boston, MA",
    type: "Internship",
    category: "Research",
    tags: ["Biology", "Lab Work", "Academic Credit"],
  },
  {
    id: "3",
    title: "Campus Ambassador",
    company: "StudyApp",
    companyLogo: "/placeholder.svg?height=32&width=32",
    location: "On Campus",
    type: "Flexible",
    category: "Sales",
    tags: ["Networking", "Events", "Commission"],
  },
];
