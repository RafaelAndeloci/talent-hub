import { EmployerRegistrationForm } from "@/components/employer/registration-form"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Employer Registration | Talent Hub",
  description: "Create an employer account to post jobs and connect with talented students",
}

export default function EmployerRegistrationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Employer Registration</h1>
              <p className="text-muted-foreground md:text-xl">
                Create an account to post jobs and connect with talented students
              </p>
            </div>
            <EmployerRegistrationForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
