import { useRouter } from 'next/dist/client/router'
import NextHead from 'next/head'

type Props = {
  title: string
  description: string
  image: string
  type: string
  date?: string
}

const Head = ({ title, description, image, type, date }: Props) => {
  const router = useRouter()
  return (
    <NextHead>
      <link
        rel="preload"
        href="/fonts/fira-sans-latin-regular.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/fira-sans-latin-700.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/fira-sans-latin-italic.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/dm-mono-latin-regular.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <title>{title}</title>

      <meta name="robots" content="follow, index" />

      <meta name="description" content={description} />
      <link rel="canonical" href={`https://edgarlr.com${router.asPath}`} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Edgar López" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`https://edgarlr.com${router.asPath}`} />
      <meta property="og:image" content={image} />

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@edgarlr_" />

      <meta name="author" content="Edgar López" />
      <meta property="article:author" content="https://twitter.com/edgarlr_" />
      {date && <meta property="article:published_time" content={date} />}

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicons/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicons/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicons/safari-pinned-tab.svg"
        color="#131414"
      />
      <meta name="msapplication-TileColor" content="#131414" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="msapplication-TileColor" content="#000" />
      <meta
        name="msapplication-TileImage"
        content="/favicons/ms-icon-144x144.png"
      />
      <meta name="theme-color" content="#000" />
    </NextHead>
  )
}

export default Head
