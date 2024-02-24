// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app'
import { useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import { useIsomorphicLayoutEffect } from '@lib/hooks/use-isomorphic-layout-effect'

import '@styles/global.css'
import '@styles/chrome-bug.css'
import { getSelectColor } from '@lib/select-colors'
import { Analytics } from '@vercel/analytics/react'

function MyApp({ Component, pageProps }: AppProps) {
  useIsomorphicLayoutEffect(() => {
    const theme = document?.documentElement.dataset?.theme
    const color = getSelectColor(theme)
    if (!color) return
    document.documentElement.style.setProperty('--highlight', color)
  }, [])

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <ThemeProvider>
      <Component {...pageProps} />
      <Analytics />
    </ThemeProvider>
  )
}

export default MyApp
