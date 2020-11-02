import styles from './Layout.module.css'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return <div className={styles.root}>{children}</div>
}

export default Layout
