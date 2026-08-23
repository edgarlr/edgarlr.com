import { createMdxCollection } from '@lib/mdx'

export type PostMetadata = {
  title: string
  description: string
  date: string
}

const posts = createMdxCollection<PostMetadata>('posts')

export const getPostMetadataBySlug = posts.getMetadataBySlug
export const getAllPostsMetadata = posts.getAllMetadata
export const getPostBySlug = posts.getBySlug
