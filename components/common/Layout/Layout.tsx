import Head from '@components/common/Head'
import { DefaultImg } from '@lib/constants'
import { Footer } from '../Footer'
import { Header } from '../Header'
import s from './Layout.module.css'

type Props = {
  children: React.ReactNode
  header?: React.ReactNode
  title?: string
  description?: string
  image?: string
  type?: 'website' | 'article'
  date?: string
}

const defaultTitle = 'Edgar López'

const Layout = ({
  children,
  header = null,
  title,
  description = "Hey, I'm Edgar, Frontend developer and designer",
  image = DefaultImg,
  type = 'website',
  date,
}: Props) => {
  return (
    <>
      <Head
        title={title ? `${title} | ${defaultTitle}` : defaultTitle}
        description={description}
        image={image}
        type={type}
        date={date}
      />
      {header ? header : <Header />}
      <main className={`${s.main} ${type === 'article' ? s.article : ''}`}>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
