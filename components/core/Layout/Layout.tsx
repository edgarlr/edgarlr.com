import { Footer, Header } from '..'
import s from './Layout.module.css'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className={s.main}>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
