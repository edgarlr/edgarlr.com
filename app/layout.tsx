import { Providers } from '@components/providers'
import './globals.css'

import { SiteURL, TwitterUsername } from '@lib/constants'
import { Analytics } from '@vercel/analytics/next'
import { Metadata } from 'next'
import { RandomSelectColor } from '@components/random-select-color'
import { Inter } from 'next/font/google'

const title = 'Edgar López'
const description =
  'A designer and engineer working across brand, product, and marketing.'

export const metadata: Metadata = {
  metadataBase: new URL(SiteURL),
  title: {
    default: title,
    template: '%s — Edgar López',
  },
  description,
  twitter: {
    title: title,
    card: 'summary_large_image',
    site: TwitterUsername,
    creator: TwitterUsername,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.edgarlr.com',
    title,
    description,
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
