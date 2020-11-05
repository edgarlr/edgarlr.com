export type TPost = {
  slug: string
  title: string
  date: string
  coverImage: string
  excerpt: string
  ogImage: {
    url: string
  }
  content: string
}

export type TPostLink = {
  slug: string
  title: string
}
