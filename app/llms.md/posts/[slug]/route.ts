import matter from 'gray-matter'
import { toMarkdown } from '@lib/llms'
import { getAllPostsMetadata, getPostSource } from '@lib/posts'
import type { PostMetadata } from '@lib/posts'
import { SiteURL } from '@lib/constants'
import { formatDate } from '@lib/llms'

export const dynamic = 'force-static'
export const dynamicParams = false

export const generateStaticParams = async () =>
  getAllPostsMetadata().map((post) => ({ slug: post.slug }))

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) => {
  const { slug } = await params
  const { data, content } = matter(getPostSource(slug))
  const meta = data as PostMetadata

  const body = [
    `# ${meta.title}`,
    `> ${meta.description}`,
    [
      `Author: Edgar López`,
      `Published: ${formatDate(meta.date)}`,
      `Source: ${SiteURL}/posts/${slug}`,
    ].join('\n'),
    await toMarkdown(content),
  ].join('\n\n')

  return new Response(body, {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      // Declared for the Accept-negotiated form, where this same body is
      // served from the HTML page's own URL.
      vary: 'Accept',
    },
  })
}
