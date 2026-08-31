import { ArticleAside } from '@components/article-aside'
import { ArticleNav } from '@components/article-nav'
import { BackLink } from '@components/back-link'
import { getAllPostsMetadata, getPostBySlug } from '@lib/posts'
import { SiteURL } from '@lib/constants'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PostsFooter } from '@components/footer'

export const generateStaticParams = async () => {
  const posts = getAllPostsMetadata()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> => {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return {
    title: post.title,
    description: post.description,
    twitter: {
      title: `${post.title} — Edgar López`,
      description: post.description,
      card: 'summary_large_image',
    },
    openGraph: {
      title: `${post.title} — Edgar López`,
      publishedTime: new Date(post.date).toISOString(),
      description: post.description,
      url: `${SiteURL}/posts/${slug}`,
      type: 'article',
    },
    authors: [
      {
        name: 'Edgar López',
        url: 'https://www.edgarlr.com',
      },
    ],
    alternates: {
      canonical: `${SiteURL}/posts/${slug}`,
      // The same page as plain markdown, for agents that would otherwise pay
      // for the whole DOM to reach the prose. Served by app/llms.md.
      types: {
        'text/markdown': `${SiteURL}/posts/${slug}.md`,
      },
    },
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  const posts = getAllPostsMetadata()

  if (!post) {
    notFound()
  }

  const postIndex = posts.findIndex((p) => p.slug === post.slug)

  const newer = postIndex > 0 ? posts.at(postIndex - 1) : null
  const older = posts.at(postIndex + 1) ?? null

  const date = new Date(post.date)

  return (
    <>
      {/* No max-width here: `.bands` sizes the reading column itself, so a post
          that reaches for a wide block has room to. */}
      <main className="w-full min-h-screen">
        <ArticleAside />

        <article className="bands prose">
          {/* not-prose: the plugin's h1 sizing and margins fight the small type
              this header is built from. */}
          <header className="not-prose  pt-20">
            <BackLink className="article-aside-fallback" />
            <h1 className="text-lg font-semibold">{post.title}</h1>
            <time
              dateTime={date.toISOString()}
              className="text-secondary text-sm"
            >
              {date.toLocaleDateString('default', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
          </header>

          {post.content}
        </article>

        <ArticleNav basePath="/posts" older={older} newer={newer} />
      </main>

      <PostsFooter />
    </>
  )
}
