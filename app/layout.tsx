import { Providers } from '@components/providers'
import './globals.css'
import '@styles/global.css'

import { Footer } from '@components/common/Footer'
import { TwitterUsername } from '@lib/constants'
import { Analytics } from '@vercel/analytics/react'
import { Metadata } from 'next'
import { RandomSelectColor } from '@components/common/random-select-color'

const title = "Edgar López"
const description = 'I build user interfaces, interactions, animations, and other web-related stuff.'

export const metadata: Metadata = {
  title: {
    default: title,
    template: '%s — Edgar López'
  },
  description,
  twitter: {
    title: title,
    card: 'summary_large_image',
    site: TwitterUsername,
    creator: TwitterUsername
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: "https://www.edgarlr.com",
    title,
    description,
    images: [
      {
        url: '/assets/social-card.jpg'
      }
    ]
  },
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <Footer />
          <Analytics />
          <RandomSelectColor />
        </Providers>
      </body>
    </html>
  )
}