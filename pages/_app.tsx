// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app'
import { useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import { useIsomorphicLayoutEffect } from '@lib/hooks/use-isomorphic-layout-effect'

import '@styles/global.css'
import '@styles/chrome-bug.css'
import { getSelectColor } from '@lib/select-colors'

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
    </ThemeProvider>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp
