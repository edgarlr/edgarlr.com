import s from './IconLink.module.css'

type Props = {
  children: React.ReactNode
  label?: string
  href: string
}

const IconLink = ({ children, label, href }: Props) => {
  return (
    <a className={s.root} href={href} target="_blank" rel="noreferrer">
      {children}
      {label && <p className={s.label}>{label}</p>}
    </a>
  )
}

export default IconLink
