import s from './Footer.module.css'
import SocialLinks from '@components/SocialLinks/SocialLinks'
import { IconLink } from '@components/ui'
import { Github } from '@components/icons'
import { RepoUrl } from '@lib/constants'

const Footer = () => {
  return (
    <footer className={s.root}>
      <select>
        <option>system</option>
      </select>
      <SocialLinks />
      <IconLink href={RepoUrl} label="Source">
        <Github size={20} />
      </IconLink>
    </footer>
  )
}

export default Footer
