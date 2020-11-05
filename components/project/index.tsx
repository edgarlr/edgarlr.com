import { Figma, Github } from '@components/icons'
import { IconLink } from '@components/ui'
import s from './Project.module.css'

type Props = {
  title: string
  linkLabel: string
  href: string
  description: string
  info: string
  imageUrl: string
  githubLink?: string
  figmaLink?: string
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
          <IconLink href={githubLink}>
            <Github />
          </IconLink>
        )}
        {figmaLink && (
          <IconLink href={figmaLink}>
            <Figma />
          </IconLink>
        )}
      </div>
      <a href={href} target="_blank" rel="noreferrer">
        <img className={s.img} src={imageUrl} />
      </a>
    </section>
  )
}

export default Project
