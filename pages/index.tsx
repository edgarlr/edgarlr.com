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
        <h1>Edgar López</h1>
        <p>
          Developer, sometimes designer. Working on Web Optimization, Growth and
          passionate about UI Interface, micro-interactions and DX. I{' '}
          <a href="#posts" className="inlineLink">
            write
          </a>{' '}
          once in a while.
        </p>
        <div className="flex vertical-margin-half">
          <SocialLinks />
        </div>
      </section>

      <section>
        {projects.map(
          ({ slug, title, description, tech, projectUrl, links }: TProject) => (
            <ProjectCard
              key={slug}
              title={title}
              href={projectUrl}
              description={description}
              info={tech}
              links={links}
            />
          )
        )}
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
