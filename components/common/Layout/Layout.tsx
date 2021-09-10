import Head from '@components/common/Head'
import { DefaultImg } from '@lib/constants'
import { Footer } from '../Footer'
import { Header } from '../Header'
import s from './Layout.module.css'
import cn from 'classnames'

type Props = {
  children: React.ReactNode
  title?: string
  description?: string
  image?: string
  type?: 'website' | 'article'
  date?: string
  showBackButton?: boolean
}

const defaultTitle = 'Edgar López'

const Layout = ({
  children,
  title = 'Edgar López',
  description = "Hey, I'm Edgar! Frontend developer, sometimes designer. I just started writting.",
  image = DefaultImg,
  type = 'website',
  date,
  showBackButton = true,
}: Props) => {
  const isArticle = type === 'article'

  const mainClasses = cn(s.main, {
    [s.article]: isArticle,
  })

  return (
    <>
      <Head
        title={title ? `${title} | ${defaultTitle}` : defaultTitle}
        description={description}
        image={image}
        type={type}
        date={date}
      />
      <Header
        title={title}
        showBackButton={showBackButton}
        isArticle={isArticle}
      />
      <main className={mainClasses}>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
