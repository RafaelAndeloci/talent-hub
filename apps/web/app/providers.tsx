'use client'
import { Sonner } from '@/components/ui/sonner'
import { ReactNode } from 'react'

interface ProvidersProps {
  children?: ReactNode
}
export function Providers({ children }: ProvidersProps) {
  return (
    <>
      {children}
      <Sonner richColors theme="light" position="bottom-right" />
    </>
  )
}
