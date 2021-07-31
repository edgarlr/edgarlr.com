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
    <Layout>
      <div className="hero">
        <h1>Edgar López</h1>
        <p>
          UI Developer, I build web applications. I just started{' '}
          <a href="#articles">writting</a>.
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
      </div>

      {projects.map(
        ({
          slug,
          title,
          linkType,
          description,
          tech,
          projectUrl,
          image,
          links,
        }: TProject) => (
          <ProjectCard
            key={slug}
            title={title}
            linkLabel={linkType}
            href={projectUrl}
            description={description}
            info={tech}
            image={image}
            links={links}
          />
        )
      )}

      <SectionContainer
        id="articles"
        title="Articles"
        subtitle="Things that I have learned along the road."
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
