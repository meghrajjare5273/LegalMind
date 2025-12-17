import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/contexts/theme'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LegalMind',
  description: 'AI legal assistant',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <body
        className={[
          geistSans.variable,
          geistMono.variable,
          'font-sans  bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-hidden',
        ].join(' ')}
      >
        <ThemeProvider >{children}</ThemeProvider>
      </body>
    </html>
  )
}
