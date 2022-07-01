import Figma from '@components/icons/Figma'
import Github from '@components/icons/Github'
import { IconLink } from '@components/ui/IconLink'
import s from './Project.module.css'
import { ArrowUpRight } from '@components/icons/ArrowUpRight'
import { ButtonList } from '@components/ui/button/ButtonList'
import { ButtonTrigger } from '@components/ui/button/ButtonTrigger'

type Props = {
  title: string
  href: string
  description: string
  info: string
  links: TProjectLink[]
}

const Project = (props: Props) => {
  const { title, href, description, info, links } = props

  const projectLinkIcons = {
    Figma,
    Github,
  }

  return (
    <div className={s.root}>
      <div className={s.projectTitle}>
        <a href={href} target="_blank" rel="noreferrer">
          <h2>
            {title}
            <span className={s.icon}>
              <ArrowUpRight width={18} height={18} />
            </span>
          </h2>
        </a>
      </div>
      <div className={s.projectBody}>
        <p>{description}</p>
        <span className={s.info}>{info}</span>
        <ButtonList className={s.links}>
          {links.map(({ icon, url, title }: TProjectLink) => {
            const IconComp = projectLinkIcons[icon]
            return (
              <ButtonTrigger key={url} id={url}>
                <IconLink
                  href={url}
                  ariaLabel={`Link to ${title}`}
                  title={title}
                  label={title}
                >
                  <IconComp width={14} height={14} />
                </IconLink>
              </ButtonTrigger>
            )
          })}
        </ButtonList>
      </div>
    </div>
  )
}

export default Project
