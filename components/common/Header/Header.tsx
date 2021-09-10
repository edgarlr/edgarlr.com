import { useEffect, useState } from 'react'
import s from './Header.module.css'
import ArrowLeft from '@components/icons/ArrowLeft'
import Link from 'next/link'
import cn from 'classnames'

type Props = {
  title: string
  isArticle: boolean
  showBackButton: boolean
}

const Header: React.FC<Props> = ({ title, isArticle, showBackButton }) => {
  const [isShowed, setIsShowed] = useState(false)

  useEffect(() => {
    const offset = isArticle ? 180 : 320

    const showText = () => {
      if (window.scrollY > offset) return setIsShowed(true)
      return setIsShowed(false)
    }

    window.addEventListener('scroll', showText, { passive: true })
    return () => {
      window.removeEventListener('scroll', showText)
    }
  }, [])

  const headerClasses = cn(s.root, {
    [s.article]: isArticle,
  })

  const titleClasses = cn(s.title, {
    [s.show]: isShowed,
  })

  return (
    <header className={headerClasses}>
      <div className={s.headerContent}>
        {showBackButton ? (
          <Link href="/">
            <a className={s.backButton}>
              <ArrowLeft />
            </a>
          </Link>
        ) : null}

        <div className={titleClasses}>{title}</div>
      </div>

      {/* backdrop support for other browsers */}
      <style jsx>{`
        header {
          -webkit-backdrop-filter: saturate(180%) blur(10px);
        }
      `}</style>
    </header>
  )
}

export default Header
