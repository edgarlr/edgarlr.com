import { Layout } from '@components/core'
import ArticleHeader from '@components/core/Header/ArticleHeader'
import BottomNav from '@components/entry/BottomNav'
import EntryHeader from '@components/entry/EntryHeader'
import markdownToHtml from '@lib/markdownToHtml'
import { getAllPosts, getPostBySlug } from '@lib/posts'
import type { TPost } from 'types'

type Props = {
  post: TPost
}

const Article = ({ post }: Props) => {
  return (
    <Layout header={<ArticleHeader text={post.title} />}>
      <EntryHeader title={post.title} date={post.date} author="edgarlr_" />
      <article dangerouslySetInnerHTML={{ __html: post.content }} />
      <BottomNav />
    </Layout>
  )
}

export default Article

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, ['title', 'content', 'slug', 'date'])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}
