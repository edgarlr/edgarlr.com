// import Dribbble from '@components/icons/Dribbble'
import Email from '@components/icons/Email'
import Figma from '@components/icons/Figma'
import Github from '@components/icons/Github'
import Linkedin from '@components/icons/Linkedin'
import Twitter from '@components/icons/Twitter'
import { IconLink } from '@components/ui/IconLink'
import {
  // DribbbleURL,
  FigmaURL,
  GithubURL,
  TwitterURL,
  EmailURL,
  LinkedinURL,
} from '@lib/constants'
import s from './SocialLinks.module.css'

const SocialLinks = () => {
  return (
    <div className={s.root}>
      <IconLink href={GithubURL} ariaLabel="Link to gihub">
        <Github width="20" height="20" />
      </IconLink>
      <IconLink href={TwitterURL} ariaLabel="Link to twitter">
        <Twitter width="20" height="20" />
      </IconLink>
      <IconLink href={EmailURL} ariaLabel="Send an email">
        <Email width="20" height="20" />
      </IconLink>
      <IconLink href={FigmaURL} ariaLabel="Link to figma">
        <Figma width="20" height="20" />
      </IconLink>
      {/* <IconLink href={DribbbleURL} ariaLabel="Link to dribble">
        <Dribbble width="20" height="20" />
      </IconLink> */}
      <IconLink href={LinkedinURL} ariaLabel="Link to Linkedin">
        <Linkedin width="20" height="20" />
      </IconLink>
    </div>
  )
}

export default SocialLinks
