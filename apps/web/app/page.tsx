import { EmployerCTA } from "@/components/app/ui/employer-cta";
import { FeaturedJobs } from "@/components/app/ui/featured-jobs";
import { Footer } from "@/components/app/ui/footer";
import { Header } from "@/components/app/ui/header";
import { HeroSection } from "@/components/app/ui/hero-section";
import { HowItWorks } from "@/components/app/ui/how-it-works";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedJobs />
        <EmployerCTA />
        <HowItWorks />
        {/* talvez no futuro */}
        {/* <Testimonials /> */}
      </main>
      <Footer />
    </div>
  );
}
