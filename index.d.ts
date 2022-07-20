declare module 'classnames'

type TProject = {
  slug: string
  title: string
  description: string
  tech: string
  projectUrl: string
  previewUrl: string
  links: TProjectLink[]
}

type TImage = {
  url: string
  altText?: string
}

type TProjectLink = {
  url: string
  icon: 'Github' | 'Figma'
  title: string
}

type TPost = {
  slug: string
  title: string
  date: string
  description: string
  image?: string
  content: string
}

type TPostLink = {
  slug: string
  title: string
}
