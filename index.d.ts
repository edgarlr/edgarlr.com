type TProject = {
  slug: string
  title: string
  linkType: string
  description: string
  tech: string
  urls: {
    main: string
    image: string
    github: string | null
    figma: string | null
  }
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

type TIcon = {
  size?: number
  color?: string
}
