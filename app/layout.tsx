import type { Metadata } from 'next'
import Script from 'next/script'
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
      <body className="min-h-screen">
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-6ZX4SK35FZ" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-6ZX4SK35FZ');`}
        </Script>
        {children}
      </body>
    </html>
  )
}
