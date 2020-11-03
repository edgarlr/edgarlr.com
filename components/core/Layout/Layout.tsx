import { Footer, Header } from '..'
import styles from './Layout.module.css'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className={styles.root}>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
