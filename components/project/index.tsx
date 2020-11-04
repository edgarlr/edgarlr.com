import s from './Project.module.css'

type Props = {
  title: string
  linkLabel: string
  href: string
  description: string
  info: string
}
const Project = (props: Props) => {
  const { title, linkLabel, href, description, info } = props
  return (
    <section className={s.root}>
      <a href={href} target="_blank" rel="noreferrer">
        <h2>
          {title}
          <span className={s.span}>{linkLabel}</span>
        </h2>
      </a>
      <p>{description}</p>
      <span>{info}</span>
      <div>Image</div>
    </section>
  )
}

export default Project
