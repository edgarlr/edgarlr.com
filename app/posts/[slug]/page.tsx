import { Header } from '@components/header'
import { HeaderScrollSpy } from '@components/header-scroll-spy'
import ArrowLeft from '@components/icons/ArrowLeft'
import ArrowRight from '@components/icons/ArrowRight'
import { getAllPostsMetadata, getPostBySlug } from '@lib/posts'
import { SiteURL } from '@lib/constants'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PostsFooter } from '@components/footer'

export const generateStaticParams = async () => {
  const posts = await getAllPostsMetadata()
  return posts.map((post) => ({
    params: { slug: post.slug },
  }))
}

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> => {
  const post = await getPostBySlug(params.slug)

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
      url: `${SiteURL}/posts/${params.slug}`,
      type: 'article',
      images: [
        {
          url: '/assets/social-card.jpg',
        },
      ],
    },
    authors: [
      {
        name: 'Edgar López',
        url: 'https://www.edgarlr.com',
      },
    ],
    alternates: {
      canonical: `${SiteURL}/posts/${params.slug}`,
    },
  }
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPostBySlug(params.slug)

  const posts = await getAllPostsMetadata()

  if (!post) {
    notFound()
  }

  const postIndex = posts.findIndex((p) => p.slug === post.slug)

  const newer = postIndex > 0 ? posts.at(postIndex - 1) : null
  const older = posts.at(postIndex + 1) ?? null

  const date = new Date(post.date)

  return (
    <>
      <Header title={post.title} showBackButton />

      <main className="w-full mx-auto min-h-screen max-lg:px-6 pb-10 max-w-[70ch] ">
        <article>
          <header className="mt-24 mb-10 md:mt-28">
            <HeaderScrollSpy />
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

          <section
            className="prose"
          >
            {post.content}
          </section>
        </article>

        <div className="flex justify-between my-20">
          {older ? (
            <Link
              href={`/posts/${older.slug}`}
              className="group max-w-32 md:max-w-60 text-sm transition-opacity opacity-60 hover:opacity-100"
            >
              <span className="flex items-center gap-1.5 mb-1 font-medium">
                <ArrowLeft
                  width={16}
                  height={16}
                  className="transition-transform group-hover:-translate-x-1.5 group-focus-visible:-translate-x-1.5"
                />
                Older
              </span>
              <span className="text-secondary">{older.title}</span>
            </Link>
          ) : (
            <div />
          )}

          {newer && (
            <Link
              href={`/posts/${newer.slug}`}
              className="group max-w-32 md:max-w-60 text-right text-sm transition-opacity opacity-60 hover:opacity-100"
            >
              <span className="flex items-center justify-end gap-1.5 mb-1 font-medium">
                Newer
                <ArrowRight
                  width={16}
                  height={16}
                  className="transition-transform group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5"
                />
              </span>
              <span className="text-secondary">{newer.title}</span>
            </Link>
          )}
        </div>
      </main>

      <PostsFooter />
    </>
  )
}
