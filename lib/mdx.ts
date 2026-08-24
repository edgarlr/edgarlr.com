import fs from 'fs'
import { join } from 'path'
import { type ReactElement } from 'react'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import type { MDXRemoteProps } from 'next-mdx-remote/rsc'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode, {
  type Options as PrettyCodeOptions,
} from 'rehype-pretty-code'
import { createCssVariablesTheme } from 'shiki'
import { components } from '@components/mdx-components'

export const CODE_BLOCK_FILENAME_REGEX = /filename="([^"]+)"/

const theme = createCssVariablesTheme({
  name: 'css-variables',
  variablePrefix: '--shiki-',
  variableDefaults: {},
  fontStyle: true,
})

const prettyCodeOpts: PrettyCodeOptions = {
  theme: theme as PrettyCodeOptions['theme'],
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
    meta.replace(CODE_BLOCK_FILENAME_REGEX, ''),
}

const compileOptions: MDXRemoteProps['options'] = {
  parseFrontmatter: true,
  // next-mdx-remote 6 strips every JSX attribute expression by default
  // (blockJS), which drops width/height from <Image width={602} .../>.
  // Our MDX is authored in this repo, so fall back to blockDangerousJS.
  blockJS: false,
  mdxOptions: {
    // @ts-ignore
    rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOpts]],
  },
}

/**
 * What the homepage timeline needs from an entry, whatever collection it came
 * from. Posts and projects each add their own fields on top; the timeline only
 * ever reads these, which is what lets the two interleave into one list.
 */
export type TimelineMetadata = {
  title: string
  date: string
  /**
   * Optional so a post can land before its art does. Without a cover an entry
   * cannot be featured, and its row loses the hover preview but nothing else.
   */
  cover?: string
  /**
   * Whether the entry leads with its cover instead of sitting in a text row.
   *
   * A flag rather than "the most recent N": the timeline is already ordered by
   * date, so recency can no longer double as the thing that earns the space.
   */
  featured?: boolean
}

/** Everything a collection derives from the file itself rather than frontmatter. */
export type MdxEntry<Meta> = Meta & {
  slug: string
  /**
   * Whether the file has anything below its frontmatter. Case studies use this
   * to decide whether a project has earned its own page yet; posts always do.
   */
  hasBody: boolean
}

export type MdxDocument<Meta> = MdxEntry<Meta> & { content: ReactElement }

/**
 * Posts and case studies are the same pipeline pointed at a different folder:
 * same frontmatter parsing, same compile options, same component map, same
 * newest-first ordering. Anything that should differ between the two belongs
 * in the MDX itself, not here.
 *
 * Takes an already-resolved absolute path rather than a folder name: Turbopack
 * has to see the root of every filesystem access statically, and a name joined
 * to `process.cwd()` in here reads as dynamic and traces the whole project —
 * source and `public/` included — into the server output.
 */
export const createMdxCollection = <Meta extends { date: string }>(
  directory: string,
) => {
  const getSource = (slug: string) =>
    fs.readFileSync(join(directory, `${slug}.mdx`), 'utf8')

  /**
   * Frontmatter only, so listings don't pay to compile every document. Reading
   * it with gray-matter rather than `compileMDX` keeps this synchronous — MDX
   * that fails to compile still shows up in a list with its title intact.
   */
  const getMetadataBySlug = (slug: string): MdxEntry<Meta> | undefined => {
    try {
      const { data, content } = matter(getSource(slug))

      return {
        ...(data as Meta),
        slug,
        hasBody: content.trim().length > 0,
      }
    } catch (error) {
      return undefined
    }
  }

  const getAllMetadata = () =>
    fs
      .readdirSync(directory)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => getMetadataBySlug(file.replace(/\.mdx$/, '')))
      .filter((entry): entry is MdxEntry<Meta> => entry !== undefined)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const getBySlug = async (
    slug: string,
  ): Promise<MdxDocument<Meta> | undefined> => {
    try {
      const source = getSource(slug)

      const { frontmatter, content } = await compileMDX<Meta>({
        options: compileOptions,
        source,
        components,
      })

      return { ...frontmatter, slug, hasBody: true, content }
    } catch (error) {
      return undefined
    }
  }

  return { getMetadataBySlug, getAllMetadata, getBySlug }
}
