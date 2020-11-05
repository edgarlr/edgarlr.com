import { useEffect, useState } from 'react'
import s from './Header.module.css'
const Header = () => {
  const [isShowed, setIsShowed] = useState(false)

  const showText = () => {
    if (window.scrollY > 320) {
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
    <header className={s.root}>
      <div className={`${s.title} ${isShowed && s.show}`}>Edgar López</div>

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
