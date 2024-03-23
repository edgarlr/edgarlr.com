import fs from 'fs'
import { join } from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import { components } from '@components/mdx-components'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode, { type Options as PrettyCodeOptions } from 'rehype-pretty-code'
import { createCssVariablesTheme } from 'shiki'

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

export const getPostMetadataBySlug = async (slug: string) => {
  const source = getPostSource(slug)

  const { frontmatter } = await compileMDX<PostMetadata>({
    options: { parseFrontmatter: true },
    source,
  })

  return { ...frontmatter, slug }
}

export async function getAllPostsMetadata() {
  const slugs = fs.readdirSync(postsDirectory).map(post => post.replace(/\.mdx$/, ''))
  const posts = await Promise.all(slugs.map((slug) => getPostMetadataBySlug(slug)))
  return posts.sort((post1, post2) => {
    const date1 = new Date(post1.date).getTime()
    const date2 = new Date(post2.date).getTime()
    return date1 < date2 ? 1 : -1
  })
}

export const CODE_BLOCK_FILENAME_REGEX = /filename="([^"]+)"/

const theme = createCssVariablesTheme({
  name: 'css-variables',
  variablePrefix: '--shiki-',
  variableDefaults: {},
  fontStyle: true
})

const prettyCodeOpts: PrettyCodeOptions = {
  theme: theme as PrettyCodeOptions["theme"],
  keepBackground: false,
  onVisitLine(node: any) {
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }]
    }
  },
  onVisitHighlightedLine(node: any) {
    node.properties.className.push('highlighted')
  },
  onVisitHighlightedChars(node: any) {
    node.properties.className = ['highlighted']
  },
  filterMetaString: (meta: string) =>
    meta.replace(CODE_BLOCK_FILENAME_REGEX, '')
}


export async function getPostBySlug(slug: string) {
  try {
    const source = getPostSource(slug)

    const { frontmatter, content } = await compileMDX<PostMetadata>({
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          // @ts-ignore
          rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOpts]],
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


