import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMdx from 'remark-mdx'
import remarkStringify from 'remark-stringify'
import { visit } from 'unist-util-visit'
import type { Node, Parent } from 'unist'
import { SiteURL } from '@lib/constants'

/**
 * An authored MDX body as plain markdown, for the per-page `.md` routes.
 *
 * The media blocks are the whole reason this exists: a case study is mostly
 * `<Wide>` / `<Video>` / `<Grid>`, and an agent reading the file as authored
 * spends most of its context on width, height and poster attributes to reach
 * one sentence of alt text. Every block collapses to a single `![alt](src)` —
 * the alt text is the description of the work, so nothing that carries meaning
 * is lost.
 *
 * Done on the mdast rather than the source string: the posts put JSX inside
 * tsx code fences, and anything matching tags textually eats those too.
 */

type JsxAttribute = {
  type: string
  name?: string
  value?: unknown
}

type JsxNode = Node & {
  name: string | null
  attributes: JsxAttribute[]
  children?: Node[]
}

/** The estree subset the MDX actually uses: literals and objects. */
const readExpression = (node: any): unknown => {
  switch (node?.type) {
    case 'Literal':
      return node.value
    case 'ObjectExpression':
      return Object.fromEntries(
        node.properties.map((property: any) => [
          property.key.name ?? property.key.value,
          readExpression(property.value),
        ]),
      )
    default:
      return undefined
  }
}

/** A plain JS value back out of a JSX attribute, literal or expression. */
const readAttribute = (attribute: JsxAttribute): unknown => {
  const { value } = attribute

  // A bare attribute — `preload` — parses with no value at all.
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value

  const expression = (value as { data?: { estree?: any } }).data?.estree
    ?.body?.[0]?.expression

  return expression ? readExpression(expression) : undefined
}

const readAttributes = (node: JsxNode): Record<string, unknown> =>
  Object.fromEntries(
    node.attributes
      .filter((attribute) => attribute.type === 'mdxJsxAttribute')
      .map((attribute) => [attribute.name!, readAttribute(attribute)]),
  )

type MediaSource = {
  src?: string
  alt?: string
  poster?: string
  label?: string
  video?: boolean
}

/**
 * One media source as a markdown image. A clip points at its poster: an agent
 * cannot watch an mp4, and the poster is a real frame of the same thing.
 */
const toImage = (source: MediaSource) => {
  const url = source.video ? (source.poster ?? source.src) : source.src

  if (!url) {
    return null
  }

  // A `label` only ever sits under one half of a pair or one tile of a
  // gallery, where it names what the alt text then describes.
  const alt = [source.label, source.alt].filter(Boolean).join(' — ')

  return {
    type: 'paragraph',
    children: [{ type: 'image', url, alt: alt || null, title: null }],
  }
}

/** A caption is prose about the block above it, so it stays as prose. */
const toCaption = (text: string) => ({
  type: 'paragraph',
  children: [{ type: 'emphasis', children: [{ type: 'text', value: text }] }],
})

/**
 * What each authored component becomes. Only the tags that hold their media
 * somewhere other than their own `src` need naming here: everything else
 * carrying one collapses to that image, and a wrapper carrying none — `<Grid>`
 * — returns null, which keeps its children and drops only the tag. A component
 * authored later lands in one of those two rather than vanishing.
 */
const flatten = (node: JsxNode): Node[] | null => {
  const props = readAttributes(node) as MediaSource & {
    caption?: string
    a?: MediaSource
    b?: MediaSource
  }

  const withCaption = (nodes: (Node | null)[]) =>
    [...nodes, props.caption ? toCaption(props.caption) : null].filter(
      Boolean,
    ) as Node[]

  switch (node.name) {
    // `<Video>` carries no `video` prop — the tag is the flag.
    case 'Video':
      return withCaption([toImage({ ...props, video: true })])

    // The one block that holds two sources instead of one.
    case 'Pair':
      return withCaption([toImage(props.a ?? {}), toImage(props.b ?? {})])

    default: {
      const image = toImage(props)

      return image ? withCaption([image]) : null
    }
  }
}

const flattenJsx = () => (tree: Node) => {
  visit(
    tree,
    ['mdxJsxFlowElement', 'mdxJsxTextElement'],
    (node: any, index, parent: Parent | undefined) => {
      if (!parent || index === null || index === undefined) return

      const replacement = flatten(node) ?? node.children ?? []
      parent.children.splice(index, 1, ...(replacement as any))

      // Revisit this position: a replacement may itself hold JSX, and the node
      // that shifted into it has not been seen yet.
      return index
    },
  )
}

/**
 * Site-relative links and images made absolute, once the media tags have become
 * images. A `.md` is read on its own, where `](/work/planetscale-homepage)` has
 * no base to resolve against.
 *
 * On the tree rather than the text, so a `](/…)` inside a code fence — a sample
 * of markdown, not a link to follow — is left alone without having to be
 * carved out.
 */
const absoluteUrls = () => (tree: Node) => {
  visit(tree, ['link', 'image'], (node: any) => {
    if (node.url?.startsWith('/')) {
      node.url = `${SiteURL}${node.url}`
    }
  })
}

const processor = unified()
  .use(remarkParse)
  .use(remarkMdx)
  .use(flattenJsx)
  .use(absoluteUrls)
  .use(remarkStringify, { bullet: '-', fences: true, rule: '-' })

export const flattenMdx = async (body: string) =>
  String(await processor.process(body)).trim()
