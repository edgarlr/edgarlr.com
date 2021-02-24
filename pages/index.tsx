import ArticlesList from '@components/articles/ArticlesList'
import { Layout } from '@components/core'
import MapPin from '@components/icons/MapPin'
import { ProjectCard } from '@components/project'
import SectionContainer from '@components/ui/SectionContainer/SectionContainer'
import { getAllPosts } from '@lib/posts'
import { getProjects } from '@lib/projects'
import { GetStaticProps } from 'next'

type Props = {
  posts: TPost[]
  projects: TProject[]
}

const Home = ({ posts, projects }: Props) => {
  return (
    <Layout>
      <div className="hero">
        <h1>Edgar López</h1>
        <p>
          Frontend developer, I build web applications. I just started{' '}
          <a href="#articles">writting</a>
        </p>
        <div className="italic flex vertical-margin-half low-opacity">
          <div className="inline-icon low-opacity">
            <MapPin width="18" height="18" style={{ marginBottom: '-2px' }} />
          </div>
          Mexico City, MX.
        </div>
      </div>

      {projects.map(({ slug, title, linkType, description, urls, tech }) => (
        <ProjectCard
          key={slug}
          title={title}
          linkLabel={linkType}
          href={urls.main}
          description={description}
          info={tech}
          imageUrl={urls.image}
          githubLink={urls.github}
          figmaLink={urls.figma}
        />
      ))}

      <SectionContainer
        id="articles"
        title="Articles"
        subtitle="Things that I've been learning along the road."
      >
        <ArticlesList posts={posts} paginate />
      </SectionContainer>
    </Layout>
  )
}
export default Home

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts(['slug', 'title', 'date'])
  const projects = getProjects()

  return {
    props: {
      posts,
      projects,
    },
  }
}
