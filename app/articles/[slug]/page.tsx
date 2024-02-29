import { Header } from "@components/header"
import { HeaderScrollSpy } from "@components/header-scroll-spy"
import ArrowLeft from "@components/icons/ArrowLeft"
import ArrowRight from "@components/icons/ArrowRight"
import { getAllPosts, getPostBySlug } from "@lib/api"
import { SiteURL } from "@lib/constants"
import dateFormatter from "@lib/date"
import markdownToHtml from "@lib/markdown"
import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

export const generateStaticParams = () => {
  const posts = getAllPosts(['slug'])
  return posts.map((post) => ({
    params: { slug: post.slug }
  }))
}

export const generateMetadata = ({ params }: { params: { slug: string } }): Metadata => {
  const post = getPostBySlug(params.slug, [
    'slug',
    'title',
    'description',
    'image',
    'date',
  ])

  if (!post.title) {
    notFound()
  }

  return {
    title: post.title,
    description: post.description,
    twitter: {
      title: `${post.title} — Edgar López`,
      description: post.description,
      card: 'summary_large_image',
      // images: generateOgImage({ title })
    },
    openGraph: {
      title: `${post.title} — Edgar López`,
      description: post.description,
      // images: generateOgImage({ title })
      url: `${SiteURL}/articles/${params.slug}`,
      type: 'article'
    },
    authors: [{
      name: "Edgar López",
      url: "https://www.edgarlr.com"
    }
    ],
    alternates: {
      canonical: `${SiteURL}/articles/${params.slug}`
    }
  }
}


export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug, [
    'slug',
    'title',
    'description',
    'image',
    'date',
    'content',
  ])


  const content = await markdownToHtml(post.content || '')

  const posts = getAllPosts(['slug', 'title'])
  const postIndex = posts.findIndex((p) => p.slug === post.slug)

  const prev = posts.at(postIndex - 1) ?? null
  const next = posts.at(postIndex + 1) ?? null


  if (!content) {
    notFound()
  }

  return (
    <>
      <Header title={post.title} showBackButton />

      <main className="w-full mx-auto min-h-screen max-lg:px-4 pb-10 max-w-[70ch] ">
        <article>
          <header className="mt-24 mb-10 md:mt-28">
            <HeaderScrollSpy />
            <h1 className='text-lg font-semibold'>{post.title}</h1>
            <time dateTime={new Date(post.date).toISOString()} className="text-secondary text-sm">
              {dateFormatter(post.date, {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </time>
          </header>

          <section className="prose" dangerouslySetInnerHTML={{ __html: content }} />
        </article>

        <div className="flex justify-between my-20">
          {prev ? (
            <Link href={`/articles/${prev.slug}`} className="group max-w-32 md:max-w-60 text-sm transition-opacity opacity-60 hover:opacity-100">
              <span className="flex items-center gap-1.5 mb-1 font-medium">
                <ArrowLeft width={16} height={16} className="transition-transform group-hover:-translate-x-1.5" />
                Older
              </span>
              <span className="text-secondary">{prev.title}</span>
            </Link>
          ) : (
            <div />
          )}

          {next && (
            <Link href={`/articles/${next.slug}`} className="group max-w-32 md:max-w-60 text-right text-sm transition-opacity opacity-60 hover:opacity-100">
              <span className="flex items-center justify-end gap-1.5 mb-1 font-medium">
                Newer
                <ArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-1.5" />
              </span>
              <span className="text-secondary">{next.title}</span>
            </Link>
          )}
        </div>
      </main>
    </>
  )
}




