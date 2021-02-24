import s from './Footer.module.css'
import SocialLinks from '@components/SocialLinks/SocialLinks'
import { RepoUrl } from '@lib/constants'
import ThemeSelect from '@components/themeSelect'
import Github from '@components/icons/Github'
import { IconLink } from '@components/ui/IconLink'

const Footer = () => {
  return (
    <footer className={s.root}>
      <ThemeSelect />
      <SocialLinks />
      <IconLink
        href={RepoUrl}
        label="Source"
        ariaLabel="Link to source code on github"
      >
        <Github width="16" height="16" />
      </IconLink>
    </footer>
  )
}

export default Footer
