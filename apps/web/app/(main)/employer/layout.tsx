import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Employer Portal | Talent Hub",
    template: "%s | Talent Hub Employer Portal",
  },
  description: "Post jobs and connect with talented students on Talent Hub",
}

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
