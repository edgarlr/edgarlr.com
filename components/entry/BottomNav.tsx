import ArrowLeft from '@components/icons/ArrowLeft'
import ArrowRight from '@components/icons/ArrowRight'
import Link from 'next/link'
import s from './BottomNav.module.css'

type Props = {
  prev: TPostLink
  next: TPostLink
}

const BottomNav = ({ prev, next }: Props) => {
  return (
    <div className={s.navContainer}>
      {prev ? (
        <Link href={`/articles/${prev.slug}`}>
          <div className={`${s.navButton} no-user-select`}>
            <div className={s.navHeader}>
              <ArrowLeft className={s.leftArrow} />
              <h4>Older</h4>
            </div>
            {prev.title}
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next && (
        <Link href={`/articles/${next.slug}`}>
          <div
            className={`${s.navButton} no-user-select`}
            style={{ textAlign: 'right' }}
          >
            <div className={s.navHeader} style={{ justifyContent: 'flex-end' }}>
              <h4>Newer</h4>
              <ArrowRight className={s.rightArrow} />
            </div>
            {next.title}
          </div>
        </Link>
      )}
    </div>
  )
}

export default BottomNav
