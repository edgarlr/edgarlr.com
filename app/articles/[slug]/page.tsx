import { Header } from "@components/common/Header"
import BottomNav from "@components/entry/BottomNav"
import EntryHeader from "@components/entry/EntryHeader"
import { getAllPosts, getPostBySlug } from "@lib/api"
import markdownToHtml from "@lib/markdownToHtml"
import { Metadata } from "next"
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
    'content',
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
      // url: `${env.NEXT_PUBLIC_MARKETING_APP_URL}/blog/${params.slug}`,
      type: 'article'
    },
    authors: [{
      name: "Edgar López",
      url: "https://www.edgarlr.com"
    }
    ],
    alternates: {
      // canonical: `${env.NEXT_PUBLIC_MARKETING_APP_URL}/blog/${params.slug}`
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
    return notFound()
  }

  return (
    <>
      <Header
        title={post.title}
        showBackButton
        isArticle
      />

      <main className="w-full mx-auto min-h-screen max-md:px-6 pb-12 max-w-screen-md ">
        <EntryHeader title={post.title} date={post.date} />
        <article dangerouslySetInnerHTML={{ __html: content }} />
        <BottomNav prev={prev as TPostLink} next={next as TPostLink} />
      </main>
    </>
  )
}




