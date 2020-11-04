import ArticlesList from '@components/articles/ArticlesList'
import { Layout } from '@components/core'
import { MapPin } from '@components/icons'
import Project from '@components/project'
import { SectionContainer } from '@components/ui'
import { PodcastsAppURL } from '@lib/constants'
import { getAllPosts } from '@lib/posts'
import { GetStaticProps } from 'next'
import type { TPost } from 'types'

type Props = {
  posts: TPost[]
}

const Home = ({ posts }: Props) => (
  <Layout>
    <div className="hero">
      <h1>Edgar López</h1>
      <p className="subtitle">
        Frontend developer, I build web applications. I just start{' '}
        <a href="#articles">writting</a>
      </p>
      <div className="italic flex vertical-margin-half">
        <div className="inline-icon">
          <MapPin size={20} />
        </div>
        Mexico City, CDMX.
      </div>
    </div>
    <Project
      title="rooms"
      linkLabel="Demo"
      href={PodcastsAppURL}
      description="Rooms based aplication for group 
      comminucation. UI Design."
      info="React, SSR, Webpack, Styled Components, WebRTC, 
      Socket.io, Redux, React-Query,  Reach router, Passport, 
      JWT, Cypress, jest, "
    />
    <Project
      title="Podcasts"
      linkLabel="Demo"
      href={PodcastsAppURL}
      description="No auth needed podcasts web app"
      info="React, Next.js, SWR, Styled Jsx, PropTypes, Sentry, 
      Cypress, Jest"
    />
    <Project
      title="Déjame te cuento"
      linkLabel="Live site"
      href={PodcastsAppURL}
      description="Digital Magazine Webapp"
      info="React, Next.js, Typescript, GraphQL, Apollo, StrapiCMS, 
      AMP, PWA Google Analythics, Cypress, Jest."
    />

    <SectionContainer
      id="articles"
      title="Articles"
      subtitle="This that I've been learning along the road."
    >
      <ArticlesList posts={posts} paginate />
    </SectionContainer>
  </Layout>
)
export default Home

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts(['slug', 'title', 'date'])

  return {
    props: {
      posts,
    },
  }
}
