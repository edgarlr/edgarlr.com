type Props = {
  children: React.ReactNode
  text: string
  href: string
}

const IconLink = ({ children, href }: Props) => {
  return <a href={href}>{children}</a>
}

export default IconLink
