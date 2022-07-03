import s from './SectionContainer.module.css'

type Props = {
  children: React.ReactNode
  id?: string
  title: string
}

const SectionContainer = ({ children, id, title }: Props) => {
  return (
    <section className={s.root} id={id}>
      <h2>{title}</h2>
      {children}
    </section>
  )
}

export default SectionContainer
