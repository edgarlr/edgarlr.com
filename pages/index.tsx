import ArticlesList from '@components/articles/ArticlesList'
import { Layout } from '@components/common/Layout'
import MapPin from '@components/icons/MapPin'
import { ProjectCard } from '@components/project'
import { SectionContainer } from '@components/ui/SectionContainer'
import { getAllPosts } from '@lib/api'
import { GetStaticProps } from 'next'
import projects from '@lib/projects'

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
          <a href="#articles">write</a> once in a while.
        </p>
        <div className="italic flex vertical-margin-half low-opacity">
          <div className="inline-icon">
            <MapPin
              width="18"
              height="18"
              style={{ opacity: '0.8', marginBottom: '-2px' }}
            />
          </div>
          Mexico City, MX.
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

      <SectionContainer
        id="articles"
        title="Articles"
        subtitle="Things I've learned along the road."
      >
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
