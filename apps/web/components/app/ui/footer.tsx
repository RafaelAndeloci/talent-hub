import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background w-full border-t">
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="flex flex-col gap-2 lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2"
              aria-label="Talent Hub Home"
            >
              <Image
                src="/placeholder.svg?height=32&width=32"
                alt="Talent Hub Logo"
                width={32}
                height={32}
                className="rounded"
              />
              <span className="text-xl font-bold">Talent Hub</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Connecting college students with meaningful job opportunities that
              fit their schedules and career goals.
            </p>
            <div className="mt-4">
              <h3 className="mb-2 text-sm font-medium">Join our newsletter</h3>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="max-w-xs"
                  aria-label="Email for newsletter"
                />
                <Button type="submit" aria-label="Subscribe to newsletter">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">For Students</h3>
            <nav className="flex flex-col gap-2" aria-label="Student resources">
              <Link
                href="/browse-jobs"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Browse Jobs
              </Link>
              <Link
                href="/create-profile"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Create Profile
              </Link>
              <Link
                href="/career-resources"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Career Resources
              </Link>
              <Link
                href="/resume-tips"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Resume Tips
              </Link>
            </nav>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">For Employers</h3>
            <nav
              className="flex flex-col gap-2"
              aria-label="Employer resources"
            >
              <Link
                href="/post-job"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Post a Job
              </Link>
              <Link
                href="/browse-students"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Browse Students
              </Link>
              <Link
                href="/employer-resources"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Resources
              </Link>
              <Link
                href="/success-stories"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Success Stories
              </Link>
            </nav>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Company</h3>
            <nav
              className="flex flex-col gap-2"
              aria-label="Company information"
            >
              <Link
                href="/about"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Contact
              </Link>
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-4">
            <Link href="#" aria-label="Facebook">
              <Facebook className="text-muted-foreground hover:text-foreground h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <Twitter className="text-muted-foreground hover:text-foreground h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram className="text-muted-foreground hover:text-foreground h-5 w-5" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="text-muted-foreground hover:text-foreground h-5 w-5" />
            </Link>
          </div>
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Talent Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
