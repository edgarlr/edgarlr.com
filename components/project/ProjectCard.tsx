import Figma from '@components/icons/Figma'
import Github from '@components/icons/Github'
import ArrowRight from '@components/icons/ArrowRight'
import { IconLink } from '@components/ui/IconLink'
import s from './Project.module.css'
import Image from 'next/image'

type Props = {
  title: string
  linkLabel: string
  href: string
  description: string
  info: string
  image: TImage
  links: TProjectLink[]
}

const Project = (props: Props) => {
  const { title, linkLabel, href, description, info, image, links } = props

  const projectLinkIcons = {
    Figma,
    Github,
  }

  return (
    <div className={s.root}>
      <div className={s.projectInfo}>
        <a href={href} target="_blank" rel="noreferrer">
          <h2>
            {title}
            <span className={s.headingLabel}>
              {linkLabel}
              <ArrowRight width={14} height={14} />
            </span>
          </h2>
        </a>

        <p>{description}</p>
        <span className={s.info}>{info}</span>
        <div className={s.links}>
          {links.map(({ icon, url, title }: TProjectLink) => {
            const IconComp = projectLinkIcons[icon]
            return (
              <IconLink
                href={url}
                ariaLabel={`Link to ${title}`}
                key={url}
                title={title}
              >
                <IconComp />
              </IconLink>
            )
          })}
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
          src={image.url}
          alt={image.altText}
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
