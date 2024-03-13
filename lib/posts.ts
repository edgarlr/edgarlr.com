import fs from 'fs'
import { join } from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import { components } from '@components/mdx-components'
import rehypeSlug from 'rehype-slug'

const postsDirectory = join(process.cwd(), 'posts')

const getPostSource = (slug: string) => {
  const fullPath = join(postsDirectory, `${slug}.mdx`)
  return fs.readFileSync(fullPath, 'utf8')
}

type PostMetadata = {
  title: string
  description: string
  date: string
}

export async function getAllPostsMetadata() {
  const slugs = fs.readdirSync(postsDirectory).map(post => {
    return post.replace(/\.mdx$/, '')
  })

  const posts = await Promise.all(slugs.map(async (slug) => {
    const source = getPostSource(slug)

    const { frontmatter } = await compileMDX<PostMetadata>({
      options: { parseFrontmatter: true },
      source,
    })

    return { ...frontmatter, slug }
  }))

  return posts.sort((post1, post2) => {
    const date1 = new Date(post1.date).getTime()
    const date2 = new Date(post2.date).getTime()
    return date1 < date2 ? 1 : -1
  })
}


export async function getPostBySlug(slug: string) {
  try {
    const source = getPostSource(slug)

    const { frontmatter, content } = await compileMDX<PostMetadata>({
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          rehypePlugins: [rehypeSlug],
        }
      },
      source,
      components,
    })

    return { ...frontmatter, slug, content }
  } catch (error) {
    return undefined
  }
}


