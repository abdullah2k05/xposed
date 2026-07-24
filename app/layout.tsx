import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'xposed — your profile, exposed.',
  description: 'Enter any X username and get your ban clock, aura, rating, ranking, and a brutal roast.',
  openGraph: {
    title: 'xposed — your profile, exposed.',
    description: 'Savage AI-powered X profile analysis. Ban clock, aura, rating, ranking & roast.',
    siteName: 'xposed',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'xposed — your profile, exposed.',
    description: 'Savage AI-powered X profile analysis. Ban clock, aura, rating, ranking & roast.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
