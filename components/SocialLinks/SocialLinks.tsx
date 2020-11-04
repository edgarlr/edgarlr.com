import { Dribbble, Figma, Github, Twitter } from '@components/icons'
import { IconLink } from '@components/ui'
import { DribbbleURL, FigmaURL, GithubURL, TwitterURL } from '@lib/constants'
import s from './SocialLinks.module.css'

const SocialLinks = () => {
  return (
    <div className={s.root}>
      <IconLink href={GithubURL}>
        <Github />
      </IconLink>
      <IconLink href={TwitterURL}>
        <Twitter />
      </IconLink>
      <IconLink href={FigmaURL}>
        <Figma />
      </IconLink>
      <IconLink href={DribbbleURL}>
        <Dribbble />
      </IconLink>
    </div>
  )
}

export default SocialLinks
