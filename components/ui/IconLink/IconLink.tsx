import { ArrowUpRight } from '@components/icons/ArrowUpRight'
import { AnchorHTMLAttributes } from 'react'
import s from './IconLink.module.css'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: React.ReactNode
  label?: string
  href: string
  ariaLabel: string
}

const IconLink = ({ children, label, href, ariaLabel, ...rest }: Props) => {
  return (
    <a
      className={s.root}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
      {...rest}
    >
      {children}
      {label && <p className={s.label}>{label}</p>}
      <span className={s.arrowIcon}>
        <ArrowUpRight width={14} height={14} />
      </span>
    </a>
  )
}

export default IconLink
