import { Providers } from '@components/providers'
import './globals.css'

import {
  SiteDescription,
  SiteName,
  SiteURL,
  TwitterUsername,
} from '@lib/constants'
import { Analytics } from '@vercel/analytics/next'
import { Metadata } from 'next'
import { RandomSelectColor } from '@components/random-select-color'
import { Inter } from 'next/font/google'

export const metadata: Metadata = {
  metadataBase: new URL(SiteURL),
  title: {
    default: SiteName,
    template: `%s — ${SiteName}`,
  },
  description: SiteDescription,
  twitter: {
    title: SiteName,
    card: 'summary_large_image',
    site: TwitterUsername,
    creator: TwitterUsername,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SiteURL,
    title: SiteName,
    description: SiteDescription,
    images: [
      {
        url: '/assets/social-card.jpg',
      },
    ],
  },
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      {/* The discovery relation from the llms.txt spec: `describedby` points at
          the llms.txt covering this page, and ours covers the whole site. The
          metadata API can't express it — `alternates.types` only ever emits
          rel="alternate" — so it's a plain <link>, which React hoists to head.

          The other half of the spec, rel="alternate" type="text/markdown"
          pointing at a page's own .md, lands with the .md routes. */}
      <link rel="describedby" href="/llms.txt" />

      <body className="antialiased bg-primary font-sans text-primary selection:[text-shadow:none] selection:bg-(--background-selection) selection:text-(--text-selection)">
        <Providers>
          {children}
          <Analytics />
          <RandomSelectColor />
        </Providers>
      </body>
    </html>
  )
}
