export type TProject = {
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
