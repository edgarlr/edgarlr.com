import ArticlesList from '@components/articles/ArticlesList'
import { Layout } from '@components/core'
import { MapPin } from '@components/icons'
import Project from '@components/project'
import { SectionContainer } from '@components/ui'
import { getAllPosts } from '@lib/posts'
import { getProjects } from '@lib/projects'
import { GetStaticProps } from 'next'
import type { TPost, TProject } from 'types'

type Props = {
  posts: TPost[]
  projects: TProject[]
}

const Home = ({ posts, projects }: Props) => (
  <Layout>
    <div className="hero">
      <h1>Edgar López</h1>
      <p>
        Frontend developer, I build web applications. I just start{' '}
        <a href="#articles">writting</a>
      </p>
      <div className="italic flex vertical-margin-half low-opacity">
        <div className="inline-icon low-opacity">
          <MapPin size={20} />
        </div>
        Mexico City, CDMX.
      </div>
    </div>

    {projects.map(({ slug, title, linkType, description, urls, tech }) => (
      <Project
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
      subtitle="This that I've been learning along the road."
    >
      <ArticlesList posts={posts} paginate />
    </SectionContainer>
  </Layout>
)
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
