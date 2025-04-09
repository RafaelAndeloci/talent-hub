import CallToAction from "../components/app/CallToAction";
import Features from "../components/app/Features";
import Footer from "../components/app/Footer";
import Header from "../components/app/Header";
import Hero from "../components/app/Hero";
import JobListings from "../components/app/JobListings";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="grow">
        <Hero />
        <Features />
        <JobListings />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
