import s from './Footer.module.css'
import SocialLinks from '@components/SocialLinks/SocialLinks'
import { RepoUrl } from '@lib/constants'
import ThemeSelect from '@components/themeSelect'
import { IconLink } from '@components/ui/IconLink'

const Footer = () => {
  return (
    <footer className={s.root}>
      <ThemeSelect />
      <SocialLinks />

      <IconLink href={RepoUrl} ariaLabel="Link to source code on github">
        Source
      </IconLink>
    </footer>
  )
}

export default Footer
