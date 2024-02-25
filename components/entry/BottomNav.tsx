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
        <Link
          href={`/articles/${prev.slug}`}
          className={`${s.navButton} no-user-select`}
        >
          <div className={s.navHeader}>
            <ArrowLeft width={18} height={18} className={s.leftArrow} />
            <span>Older</span>
          </div>
          {prev.title}
        </Link>
      ) : (
        <div />
      )}
      {next && (
        <Link
          href={`/articles/${next.slug}`}
          className={`${s.navButton} no-user-select`}
          style={{ textAlign: 'right' }}
        >
          <div className={s.navHeader} style={{ justifyContent: 'flex-end' }}>
            <span>Newer</span>
            <ArrowRight width={18} height={18} className={s.rightArrow} />
          </div>
          {next.title}
        </Link>
      )}
    </div>
  )
}

export default BottomNav
