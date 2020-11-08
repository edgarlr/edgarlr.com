import { ArrowLeft } from '@components/icons'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import s from './Header.module.css'

type Props = {
  text: string
}

const ArticleHeader = ({ text }: Props) => {
  const [isShowed, setIsShowed] = useState(false)

  const showText = () => {
    if (window.scrollY > 180) {
      setIsShowed(true)
    } else {
      setIsShowed(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', showText)
    return () => {
      window.removeEventListener('scroll', showText)
    }
  }, [])

  return (
    <header className={`${s.root} ${s.article}`}>
      <Link href="/">
        <a className={s.backButton}>
          <ArrowLeft />
        </a>
      </Link>
      <div className={`${s.title} ${isShowed ? s.show : ''}`}>{text}</div>

      {/* backdrop support for other browsers */}
      <style jsx>{`
        header {
          -webkit-backdrop-filter: saturate(180%) blur(10px);
        }
      `}</style>
    </header>
  )
}

export default ArticleHeader
