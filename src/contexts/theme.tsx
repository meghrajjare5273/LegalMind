'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light" // Changed from 'system' to 'light' to ensure consistency
      enableSystem={false} // Disable system detection to prevent mismatch on deployment
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}