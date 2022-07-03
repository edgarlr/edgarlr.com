import { ArrowUpRight } from '@components/icons/ArrowUpRight'
import { AnchorHTMLAttributes } from 'react'
import s from './IconLink.module.css'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: React.ReactNode
  href: string
  ariaLabel: string
}

const IconLink = ({ children, href, ariaLabel, ...rest }: Props) => {
  return (
    <a
      className={s.root}
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={ariaLabel}
      {...rest}
    >
      {children}
      <span className={s.arrowIcon}>
        <ArrowUpRight width={14} height={14} />
      </span>
    </a>
  )
}

export default IconLink
