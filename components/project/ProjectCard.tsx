import Figma from '@components/icons/Figma'
import Github from '@components/icons/Github'
import { IconLink } from '@components/ui/IconLink'
import s from './Project.module.css'
import Image from 'next/image'

type Props = {
  title: string
  linkLabel: string
  href: string
  description: string
  info: string
  imageUrl: string
  githubLink: string | null
  figmaLink: string | null
}

const Project = (props: Props) => {
  const {
    title,
    linkLabel,
    href,
    description,
    info,
    imageUrl,
    githubLink = null,
    figmaLink = null,
  } = props
  return (
    <div className={s.root}>
      <div className={s.projectInfo}>
        <a href={href} target="_blank" rel="noreferrer">
          <h2>
            {title}
            <span className={s.headingLabel}>{linkLabel}</span>
          </h2>
        </a>
        <p>{description}</p>
        <span className={s.info}>{info}</span>
        <div className={s.links}>
          {githubLink && (
            <IconLink href={githubLink} ariaLabel="Link to github repo">
              <Github />
            </IconLink>
          )}
          {figmaLink && (
            <IconLink href={figmaLink} ariaLabel="Link to figma file">
              <Figma />
            </IconLink>
          )}
        </div>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={`Link to ${title}`}
        className={s.imgContainer}
      >
        <Image
          src={imageUrl}
          alt={`${title} screenshot`}
          width={450}
          height={450}
          objectFit="contain"
          className={s.img}
        />
      </a>
    </div>
  )
}

export default Project
