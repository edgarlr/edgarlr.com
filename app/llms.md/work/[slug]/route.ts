import { notFound } from 'next/navigation'
import { pageMarkdown } from '@lib/llms'
import {
  getAllProjectsMetadata,
  getRawProjectBySlug,
  hasCaseStudy,
} from '@lib/work'

// The markdown twin of /work/[slug], reached through the rewrites in
// next.config.js — `[slug].md` is not a segment a route file can express.
export const dynamic = 'force-static'
// A project without a body has no case study to render, in either format.
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
  const project = getRawProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return new Response(pageMarkdown({ kind: 'project', ...project }), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      // Declared for the Accept-negotiated form, where this same body is
      // served from the HTML page's own URL.
      Vary: 'Accept',
    },
  })
}
