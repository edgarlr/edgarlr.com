import s from './SectionContainer.module.css'

type Props = {
  children: React.ReactNode
  id?: string
  title: string
  subtitle: string
}

const SectionContainer = ({ children, id, title, subtitle }: Props) => {
  return (
    <section className={s.root} id={id}>
      <h2>{title}</h2>
      <p>{subtitle}</p>
      {children}
    </section>
  )
}

export default SectionContainer
