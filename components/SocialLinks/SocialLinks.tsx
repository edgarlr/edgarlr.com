import { Dribbble, Figma, Github, Twitter } from '@components/icons'
import Email from '@components/icons/Email'
import { IconLink } from '@components/ui'
import {
  DribbbleURL,
  FigmaURL,
  GithubURL,
  TwitterURL,
  EmailURL,
} from '@lib/constants'
import s from './SocialLinks.module.css'

const SocialLinks = () => {
  const ICON_SIZE = 20
  return (
    <div className={s.root}>
      <IconLink href={GithubURL}>
        <Github size={ICON_SIZE} />
      </IconLink>
      <IconLink href={TwitterURL}>
        <Twitter size={ICON_SIZE} />
      </IconLink>
      <IconLink href={EmailURL}>
        <Email size={ICON_SIZE} />
      </IconLink>
      <IconLink href={FigmaURL}>
        <Figma size={ICON_SIZE} />
      </IconLink>
      <IconLink href={DribbbleURL}>
        <Dribbble size={ICON_SIZE} />
      </IconLink>
    </div>
  )
}

export default SocialLinks
