import Figma from '@components/icons/Figma'
import Github from '@components/icons/Github'
import { IconLink } from '@components/ui/IconLink'
import s from './Project.module.css'

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
    <section className={s.root}>
      <div className={s.projectInfo}>
        <a href={href} target="_blank" rel="noreferrer">
          <h2>
            {title}
            <span className={s.span}>{linkLabel}</span>
          </h2>
        </a>
        <p>{description}</p>
        <span className={s.info}>{info}</span>
        <div className={s.links}>
          {githubLink && (
            <IconLink href={githubLink} ariaLabel="Link to gihub">
              <Github />
            </IconLink>
          )}
          {figmaLink && (
            <IconLink href={figmaLink} ariaLabel="Link to figma">
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
      >
        <img className={s.img} src={imageUrl} alt={`${title} screenshot`} />
      </a>
    </section>
  )
}

export default Project
