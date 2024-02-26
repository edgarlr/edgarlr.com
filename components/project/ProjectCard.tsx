import { ArrowUpRight } from '@components/icons/ArrowUpRight'
// import { ButtonList } from '@components/ui/button/ButtonList'
// import { ButtonTrigger } from '@components/ui/button/ButtonTrigger'
import { LinkPreview } from '@components/ui/link'
import s from './Project.module.css'

const ProjectCard = ({
  title,
  projectUrl,
  description,
  tech,
  links,
  previewUrl,
}: TProject) => (
  <div className={s.card} style={{ display: 'grid', padding: '2rem 0' }}>
    <LinkPreview
      className={s.projectLink}
      previewSrc={previewUrl}
      href={projectUrl}
      target="_blank"
      rel="noreferrer noopener"
    >
      <h2 className={s.title}>
        {title}
        <span className={s.icon}>
          <ArrowUpRight width={16} height={16} />
        </span>
      </h2>
    </LinkPreview>

    <div className={s.projectBody}>
      <p className={s.description}>{description}</p>
      <span className={s.tech}>{tech}</span>
      {/* <ButtonList className={s.links}>
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
      </ButtonList> */}
    </div>
  </div>
)

export default ProjectCard
