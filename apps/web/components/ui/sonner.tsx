'use client'

import { useTheme } from 'next-themes'
import { Toaster, ToasterProps, toast as sonner } from 'sonner'

const Sonner = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Toaster
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Sonner, sonner }
