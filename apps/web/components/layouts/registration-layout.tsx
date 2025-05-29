'use client'

import { cn } from '@/lib/utils'
import { ChevronRight, GraduationCap } from 'lucide-react'
import Link from 'next/link'
import type React from 'react'
import { Button } from '../ui/button'

interface RegistrationLayoutAltProps {
  children: React.ReactNode
  title: string
  subtitle: string
  currentStep?: number
  totalSteps?: number
  steps?: { title: string; icon: React.ReactNode }[]
}

export function RegistrationLayout({
  children,
  title,
  subtitle,
  currentStep = 1,
  totalSteps = 5,
  steps,
}: RegistrationLayoutAltProps) {
  return (
    <div className="to-background min-h-screen bg-gradient-to-b from-neutral-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <Button variant="ghost" className="h-auto" asChild>
              <Link
                href="/"
                className="flex items-center gap-2"
                aria-label="Talent Hub Home"
              >
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                  <GraduationCap className="size-8! rounded" />
                </div>
                <span className="text-xl font-bold">Talent Hub</span>
              </Link>
            </Button>
            <div className="text-sm">
              Já tem uma conta?{' '}
              <Link
                href="/login"
                className="text-primary font-medium hover:underline"
              >
                Entre aqui!
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto max-w-4xl">
          {/* Title Section */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {title}
            </h1>
            <p className="mt-2 text-neutral-400">{subtitle}</p>
          </div>

          {/* Steps Indicator */}
          {steps && (
            <div className="mb-8 hidden md:block">
              <div className="relative mx-auto flex max-w-3xl justify-between">
                {/* Progress Bar */}
                <div className="bg-muted absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2">
                  <div
                    className="bg-primary h-full transition-all duration-300"
                    style={{
                      width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
                    }}
                  ></div>
                </div>

                {/* Step Circles */}
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={cn(
                      'bg-background relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all',
                      index + 1 < currentStep
                        ? 'border-primary bg-primary text-primary-foreground'
                        : index + 1 === currentStep
                          ? 'border-primary text-primary'
                          : 'border-muted-foreground/30 text-muted-foreground/50'
                    )}
                  >
                    {step.icon}
                    <span
                      className={cn(
                        'absolute -bottom-6 left-1/2 w-max -translate-x-1/2 text-xs font-medium text-neutral-600',
                        index + 1 === currentStep && 'text-foreground'
                      )}
                    >
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mobile Step Indicator */}
          <div className="mb-6 md:hidden">
            <div className="flex items-center justify-between text-sm">
              <div className="font-medium">
                Step {currentStep} of {totalSteps}
              </div>
              <div className="text-muted-foreground">
                {Math.round((currentStep / totalSteps) * 100)}% Complete
              </div>
            </div>
            <div className="bg-muted mt-2 h-1.5 w-full overflow-hidden rounded-full">
              <div
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Content Card */}
          <div className="bg-background relative overflow-hidden rounded-xl shadow-lg">
            {/* Decorative Elements */}
            <div className="bg-primary/10 absolute -top-12 -right-12 h-40 w-40 rounded-full"></div>
            <div className="bg-primary/5 absolute -bottom-12 -left-12 h-40 w-40 rounded-full"></div>

            <div className="relative z-10 p-6 sm:p-8">{children}</div>
          </div>

          {/* Navigation Hints */}
          {currentStep > 1 && (
            <div className="text-muted-foreground mt-4 text-center text-sm">
              <Button
                variant="link"
                type="button"
                onClick={() => window.history.back()}
                className="hover:text-foreground inline-flex cursor-pointer items-center hover:underline"
              >
                <ChevronRight className="mr-1 h-3 w-3 rotate-180" />
                Voltar para a tela de cadastro
              </Button>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="text-muted-foreground mt-12 text-center text-sm">
          <p>
            © {new Date().getFullYear()} Talent Hub. Todos os direitos
            reservados.
          </p>
        </footer>
      </div>
    </div>
  )
}
