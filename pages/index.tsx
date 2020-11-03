import { ArrowLeft, Dribbble, Twitter } from '@components/icons'
import { getAllPosts } from '@lib/posts'
import { GetStaticProps } from 'next'
import type { TPost } from 'types'

type Props = {
  posts: TPost[]
}

const Home = ({ posts }: Props) => (
  <div>
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
  </div>
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
