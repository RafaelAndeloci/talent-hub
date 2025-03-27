import CallToAction from "./components/CallToAction";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import JobListings from "./components/JobListings";

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
