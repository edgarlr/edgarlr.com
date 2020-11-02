import { Layout } from '@components/core'
import markdownToHtml from '@lib/markdownToHtml'
import { getAllPosts, getPostBySlug } from '@lib/posts'
import type { TPost } from 'types'

type Props = {
  post: TPost
}

const Article = ({ post }: Props) => {
  return (
    <Layout>
      {post.title}
      <br />
      {post.slug}
      <br />
      {post.date}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
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
