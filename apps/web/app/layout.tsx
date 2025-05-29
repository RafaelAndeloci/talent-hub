import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import type React from 'react'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Talent Hub - Conecte-se com oportunidades',
  description:
    'Encontre estágios, empregos de nível de entrada e recursos de carreira adaptados para alunos de graduação e recém-graduados.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={inter.className + ' antialiased'}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
