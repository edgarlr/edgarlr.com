import { ArrowLeft, ArrowRight } from '@components/icons'
import Link from 'next/link'
import s from './Entry.module.css'

const BottomNav = () => {
  return (
    <div className={s.navContainer}>
      <Link href="/">
        <div className={s.navButton}>
          <div className={s.navHeader}>
            <ArrowLeft />
            <h4>Older</h4>
          </div>
          this is a post example
        </div>
      </Link>
      <Link href="/">
        <div className={s.navButton} style={{ textAlign: 'right' }}>
          <div className={s.navHeader} style={{ justifyContent: 'flex-end' }}>
            <h4>Newer</h4>
            <ArrowRight />
          </div>
          this is a post example
        </div>
      </Link>
    </div>
  )
}

export default BottomNav
