import { useEffect, useState } from 'react'
import s from './Header.module.css'
import ArrowLeft from '@components/icons/ArrowLeft'
import Link from 'next/link'
import cn from 'clsx'

type Props = {
  title: string
  isArticle: boolean
  showBackButton: boolean
}

const Header: React.FC<Props> = ({ title, isArticle, showBackButton }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const offset = isArticle ? 180 : 300

    const showText = () => {
      if (window.scrollY > offset) return setIsVisible(true)
      return setIsVisible(false)
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
    [s.show]: isVisible,
  })

  return (
    <header data-visible={isVisible} className={headerClasses}>
      <div className={s.headerContent}>
        {showBackButton ? (
          <Link href="/" className={s.backButton} aria-label="Go to home">
            <ArrowLeft width={20} height={20} />
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
