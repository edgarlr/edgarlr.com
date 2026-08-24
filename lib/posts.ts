import { join } from 'path'
import {
  createMdxCollection,
  type MdxEntry,
  type TimelineMetadata,
} from '@lib/mdx'

export type PostMetadata = TimelineMetadata & {
  /**
   * The meta description, written for a search result. The timeline shows only
   * a label and a title, so nothing renders this outside the post's own page.
   */
  description: string
}

export type Post = MdxEntry<PostMetadata>

const posts = createMdxCollection<PostMetadata>(join(process.cwd(), 'posts'))

export const getPostMetadataBySlug = posts.getMetadataBySlug
export const getAllPostsMetadata = posts.getAllMetadata
export const getPostBySlug = posts.getBySlug
