import s from './Footer.module.css'
import SocialLinks from '@components/SocialLinks/SocialLinks'
import ThemeSelect from '@components/themeSelect'

const Footer = () => {
  return (
    <footer className={s.root}>
      <SocialLinks />
      <ThemeSelect />
    </footer>
  )
}

export default Footer
