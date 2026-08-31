import 'server-only'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMdx from 'remark-mdx'
import remarkStringify from 'remark-stringify'
import { visit } from 'unist-util-visit'
import type { Node, Parent } from 'unist'

/**
 * Flattens authored MDX into plain markdown for the `.md` responses.
 *
 * The media blocks are the whole reason this exists: a case study is mostly
 * <Wide>/<Video>/<Grid>, and an agent reading the raw file spends most of its
 * context on width/height/poster attributes to reach one sentence of alt text.
 * Every block collapses to a single `![alt](src)` line — the alt text is the
 * description, so nothing that carries meaning is lost.
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

/** Pull a plain JS value back out of a JSX attribute, literal or expression. */
const readAttribute = (attribute: JsxAttribute): unknown => {
  const { value } = attribute
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value

  const expression = (value as { data?: { estree?: any } }).data?.estree
    ?.body?.[0]?.expression

  return expression ? readExpression(expression) : undefined
}

/** The estree subset our MDX actually uses: literals, arrays and objects. */
const readExpression = (node: any): unknown => {
  switch (node?.type) {
    case 'Literal':
      return node.value
    case 'ArrayExpression':
      return node.elements.map(readExpression)
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

const readAttributes = (node: JsxNode): Record<string, unknown> =>
  Object.fromEntries(
    node.attributes
      .filter((attribute: JsxAttribute) => attribute.type === 'mdxJsxAttribute')
      .map((attribute: JsxAttribute) => [
        attribute.name!,
        readAttribute(attribute),
      ]),
  )

type MediaSource = {
  src?: string
  alt?: string
  poster?: string
  label?: string
  video?: boolean
}

/**
 * One media source as a markdown image. Video points at its poster: an agent
 * can't watch an mp4, and the poster is a real frame of the same thing.
 */
const toImage = (source: MediaSource) => {
  const url =
    source.video || source.poster ? (source.poster ?? source.src) : source.src
  if (!url) return null

  const alt = [source.label, source.alt].filter(Boolean).join(' — ')

  return {
    type: 'paragraph',
    children: [{ type: 'image', url, alt: alt || null, title: null }],
  }
}

const CAPTION = (text: string) => ({
  type: 'paragraph',
  children: [{ type: 'emphasis', children: [{ type: 'text', value: text }] }],
})

/**
 * What each authored component becomes. Anything not listed keeps its children
 * and drops its wrapper, so an unknown block degrades to its contents rather
 * than vanishing.
 */
const flatten = (node: JsxNode): Node[] | null => {
  const props = readAttributes(node) as MediaSource & {
    caption?: string
    title?: string
    href?: string
    a?: MediaSource
    b?: MediaSource
    items?: MediaSource[]
  }

  const withCaption = (nodes: (Node | null)[]) =>
    [...nodes, props.caption ? CAPTION(props.caption) : null].filter(
      Boolean,
    ) as Node[]

  switch (node.name) {
    case 'Wide':
    case 'Image':
    case 'Detail':
    case 'Video':
      return withCaption([
        toImage(node.name === 'Video' ? { ...props, video: true } : props),
      ])

    case 'Pair':
      return withCaption([toImage(props.a ?? {}), toImage(props.b ?? {})])

    case 'Gallery':
      return withCaption((props.items ?? []).map(toImage))

    case 'PreviewLink':
      return [
        {
          type: 'link',
          url: props.href!,
          title: null,
          children: [{ type: 'text', value: props.title ?? props.href! }],
        } as Node,
      ]

    default:
      return null
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

      return index
    },
  )
}

const processor = unified()
  .use(remarkParse)
  .use(remarkMdx)
  .use(flattenJsx)
  .use(remarkStringify, { bullet: '-', fences: true, rule: '-' })

export const toMarkdown = async (body: string) =>
  String(await processor.process(body))

/**
 * `MM/DD/YYYY` frontmatter as `YYYY-MM-DD`, without going through Date: the
 * dates are authored as local wall-clock, so `toISOString` shifts them a day.
 */
export const formatDate = (date: string) => {
  const [month, day, year] = date.split('/')
  return `${year}-${month}-${day}`
}
