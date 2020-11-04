import { Footer, Header } from '..'
import s from './Layout.module.css'

type Props = {
  children: React.ReactNode
  header?: React.ReactNode
}

const Layout = ({ children, header = null }: Props) => {
  return (
    <>
      {header ? header : <Header />}
      <main className={s.main}>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
