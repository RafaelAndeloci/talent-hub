import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
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
        </div>

        <nav
          className="hidden items-center gap-6 md:flex"
          aria-label="Main Navigation"
        >
          <Link
            href="/jobs"
            className="hover:text-primary text-sm font-medium transition-colors"
            aria-label="Browse job applications"
          >
            Job Applications
          </Link>
          <Link
            href="/people"
            className="hover:text-primary text-sm font-medium transition-colors"
            aria-label="Browse profiles"
          >
            People
          </Link>
          <Link
            href="/resources"
            className="hover:text-primary text-sm font-medium transition-colors"
            aria-label="Career resources"
          >
            Resources
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/login" aria-label="Log in to your account">
              Log in
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/register" aria-label="Create a new account">
              Register
            </Link>
          </Button>
        </div>
      </div>

      {/* Mobile navigation menu - simplified for accessibility */}
      <div className="border-t md:hidden">
        <nav
          className="container flex justify-between py-2"
          aria-label="Mobile Navigation"
        >
          <Link
            href="/jobs"
            className="flex flex-1 justify-center py-2 text-sm font-medium"
            aria-label="Browse job applications"
          >
            Jobs
          </Link>
          <Link
            href="/people"
            className="flex flex-1 justify-center py-2 text-sm font-medium"
            aria-label="Browse profiles"
          >
            People
          </Link>
          <Link
            href="/resources"
            className="flex flex-1 justify-center py-2 text-sm font-medium"
            aria-label="Career resources"
          >
            Resources
          </Link>
        </nav>
      </div>
    </header>
  );
}
