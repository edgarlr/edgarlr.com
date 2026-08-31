import matter from 'gray-matter'
import { toMarkdown } from '@lib/llms'
import {
  getAllProjectsMetadata,
  getProjectSource,
  hasCaseStudy,
} from '@lib/work'
import type { ProjectMetadata } from '@lib/work'
import { SiteURL } from '@lib/constants'
import { formatDate } from '@lib/llms'

export const dynamic = 'force-static'
export const dynamicParams = false

export const generateStaticParams = async () =>
  getAllProjectsMetadata()
    .filter(hasCaseStudy)
    .map((project) => ({ slug: project.slug }))

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) => {
  const { slug } = await params
  const { data, content } = matter(getProjectSource(slug))
  const meta = data as ProjectMetadata

  const body = [
    `# ${meta.title}`,
    meta.summary && `> ${meta.summary}`,
    [
      `Client: ${meta.client}`,
      `Date: ${formatDate(meta.date)}`,
      meta.href && `Live: ${meta.href}`,
      `Source: ${SiteURL}/work/${slug}`,
    ]
      .filter(Boolean)
      .join('\n'),
    await toMarkdown(content),
  ]
    .filter(Boolean)
    .join('\n\n')

  return new Response(body, {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      // Declared for the Accept-negotiated form, where this same body is
      // served from the HTML page's own URL.
      vary: 'Accept',
    },
  })
}
