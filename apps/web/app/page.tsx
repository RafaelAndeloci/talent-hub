import Header from "./components/Header"
import Hero from "./components/Hero"
import Features from "./components/Features"
import JobListings from "./components/JobListings"
import CallToAction from "./components/CallToAction"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <JobListings />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}

