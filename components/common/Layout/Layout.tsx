import Head from '@components/common/Head'
import { DefaultImg } from '@lib/constants'
import { Footer } from '../Footer'
import { Header } from '../Header'
import s from './Layout.module.css'

type Props = {
  children: React.ReactNode
  header?: React.ReactNode
  isArticle?: boolean
  title?: string
  description?: string
  image?: string
}

const defaultTitle = 'Edgar López'

const Layout = ({
  children,
  header = null,
  isArticle,
  title,
  description = "Hey, I'm Edgar, Frontend developer and designer",
  image = DefaultImg,
}: Props) => {
  return (
    <>
      <Head
        title={title ? `${title} | ${defaultTitle}` : defaultTitle}
        description={description}
        image={image}
      />
      {header ? header : <Header />}
      <main className={`${s.main} ${isArticle ? s.article : ''}`}>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
