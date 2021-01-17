import s from './IconLink.module.css'

type Props = {
  children: React.ReactNode
  label?: string
  href: string
  ariaLabel: string
}

const IconLink = ({ children, label, href, ariaLabel }: Props) => {
  return (
    <a
      className={s.root}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
    >
      {children}
      {label && <p className={s.label}>{label}</p>}
    </a>
  )
}

export default IconLink
