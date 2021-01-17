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
      <IconLink href={GithubURL} ariaLabel="Link to gihub">
        <Github size={ICON_SIZE} />
      </IconLink>
      <IconLink href={TwitterURL} ariaLabel="Link to twitter">
        <Twitter size={ICON_SIZE} />
      </IconLink>
      <IconLink href={EmailURL} ariaLabel="Send an email">
        <Email size={ICON_SIZE} />
      </IconLink>
      <IconLink href={FigmaURL} ariaLabel="Link to figma">
        <Figma size={ICON_SIZE} />
      </IconLink>
      <IconLink href={DribbbleURL} ariaLabel="Link to dribble">
        <Dribbble size={ICON_SIZE} />
      </IconLink>
    </div>
  )
}

export default SocialLinks
