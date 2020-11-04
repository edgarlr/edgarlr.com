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
    </header>
  )
}

export default Header
