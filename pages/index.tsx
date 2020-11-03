import { Layout } from '@components/core'
import { ArrowLeft, Dribbble, Twitter } from '@components/icons'
import { getAllPosts } from '@lib/posts'
import { GetStaticProps } from 'next'
import type { TPost } from 'types'

type Props = {
  posts: TPost[]
}

const Home = ({ posts }: Props) => (
  <Layout>
    <h1>Edgar López</h1>
    {posts.map(({ slug, date, title }) => (
      <li key={slug}>
        {title}
        <br />
        {slug}
        <br />
        {date}
      </li>
    ))}
    <Twitter />
    <Dribbble size={50} />
    <ArrowLeft />
    <code>useCallback</code>
  </Layout>
)
export default Home

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts(['slug'])

  return {
    props: {
      posts,
    },
  }
}
