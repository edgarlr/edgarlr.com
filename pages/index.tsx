import ArticlesList from '@components/articles/ArticlesList'
import { Layout } from '@components/common/Layout'
import { ProjectCard } from '@components/project'
import { SectionContainer } from '@components/ui/SectionContainer'
import { getAllPosts } from '@lib/api'
import { GetStaticProps } from 'next'
import projects from '@lib/projects'
import SocialLinks from '@components/SocialLinks/SocialLinks'

type Props = {
  posts: TPost[]
}

const Home = ({ posts }: Props) => {
  return (
    <Layout showBackButton={false}>
      <section className="hero">
        <p>
          Hey, I&apos;m Edgar. Developer and designer. Passionate about user
          interfaces, interactions, and web experiences. I{' '}
          <a href="#posts" className="inlineLink">
            write about it
          </a>{' '}
          once in a while.
        </p>
        <div className="flex vertical-margin-half">
          <SocialLinks />
        </div>
      </section>

      <section>
        {projects.map((project: TProject) => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </section>

      <SectionContainer id="posts" title="Posts">
        <ArticlesList posts={posts} paginate />
      </SectionContainer>
    </Layout>
  )
}
export default Home

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts(['slug', 'title', 'date'])

  return {
    props: { posts },
  }
}
