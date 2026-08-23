import type { MDXRemoteProps } from 'next-mdx-remote/rsc'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode, {
  type Options as PrettyCodeOptions,
} from 'rehype-pretty-code'
import { createCssVariablesTheme } from 'shiki'

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

/**
 * Shared by posts and case studies, so the two bodies of MDX behave the same:
 * same component map (@components/mdx-components), same heading slugs, same
 * code highlighting.
 */
export const compileOptions: MDXRemoteProps['options'] = {
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
