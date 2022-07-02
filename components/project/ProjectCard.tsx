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

const Project = ({ title, href, description, info, links }: Props) => (
  <div className={s.root}>
    <div className={s.projectTitle}>
      <a href={href} target="_blank" className={s.projectLink} rel="noreferrer">
        <h2>
          {title}
          <span className={s.icon}>
            <ArrowUpRight width={18} height={18} />
          </span>
        </h2>
      </a>
    </div>
    <div className={s.projectBody}>
      <p className={s.description}>{description}</p>
      <span className={s.info}>{info}</span>
      <ButtonList className={s.links}>
        {links.map(({ url, title }: TProjectLink) => (
          <ButtonTrigger
            key={url}
            id={url}
            as="a"
            href={url}
            target="__black"
            rel="noreferrer noopener"
            withIcon
          >
            {title}
          </ButtonTrigger>
        ))}
      </ButtonList>
    </div>
  </div>
)

export default Project
