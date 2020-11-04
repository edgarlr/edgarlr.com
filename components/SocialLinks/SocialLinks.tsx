import { Dribbble, Figma, Github, Twitter } from '@components/icons'
import { IconLink } from '@components/ui'
import { DribbbleURL, FigmaURL, GithubURL, TwitterURL } from '@lib/constants'
import s from './SocialLinks.module.css'

const SocialLinks = () => {
  return (
    <div className={s.root}>
      <IconLink href={GithubURL} label="Github">
        <Github />
      </IconLink>
      <IconLink href={TwitterURL} label="twitter">
        <Twitter />
      </IconLink>
      <IconLink href={FigmaURL} label="Figma">
        <Figma />
      </IconLink>
      <IconLink href={DribbbleURL} label="Dribbble">
        <Dribbble />
      </IconLink>
    </div>
  )
}

export default SocialLinks
