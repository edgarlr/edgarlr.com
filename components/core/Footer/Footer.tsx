import s from './Footer.module.css'
import SocialLinks from '@components/SocialLinks/SocialLinks'
import { IconLink } from '@components/ui'
import { Github } from '@components/icons'
import { RepoUrl } from '@lib/constants'
import ThemeSelect from '@components/themeSelect'

const Footer = () => {
  return (
    <footer className={s.root}>
      <ThemeSelect />
      <SocialLinks />
      <IconLink href={RepoUrl} label="Source">
        <Github size={16} />
      </IconLink>
    </footer>
  )
}

export default Footer
