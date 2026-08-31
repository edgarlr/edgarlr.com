import { notFound } from 'next/navigation'
import { pageMarkdown } from '@lib/llms'
import { getAllPostsMetadata, getRawPostBySlug } from '@lib/posts'

// The markdown twin of /posts/[slug], reached through the rewrites in
// next.config.js — `[slug].md` is not a segment a route file can express.
export const dynamic = 'force-static'
// Every post has a page, so an unknown slug is a 404 here as it is there.
export const dynamicParams = false

export const generateStaticParams = async () =>
  getAllPostsMetadata().map((post) => ({ slug: post.slug }))

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) => {
  const { slug } = await params
  const post = getRawPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return new Response(await pageMarkdown({ kind: 'post', ...post }), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      // Declared for the Accept-negotiated form, where this same body is
      // served from the HTML page's own URL.
      Vary: 'Accept',
    },
  })
}
