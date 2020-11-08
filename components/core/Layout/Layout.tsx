import Head from 'next/head'
import { Footer, Header } from '..'
import s from './Layout.module.css'

type Props = {
  children: React.ReactNode
  header?: React.ReactNode
  isArticle?: boolean
}

const Layout = ({ children, header = null, isArticle }: Props) => {
  return (
    <>
      <Head>
        <title>Edgar López</title>
      </Head>
      {header ? header : <Header />}
      <main className={`${s.main} ${isArticle ? s.article : ''}`}>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
