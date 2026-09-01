import { ArticleAside } from '@components/article-aside'
import { ArticleNav } from '@components/article-nav'
import { BackLink } from '@components/back-link'
import { JsonLd } from '@components/json-ld'
import { PostsFooter } from '@components/footer'
import {
  getAllProjectsMetadata,
  getProjectBySlug,
  hasCaseStudy,
} from '@lib/work'
import { SiteURL } from '@lib/constants'
import { projectSchema } from '@lib/schema'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Only projects whose file has a body get a page. Everything else still links
// out from the homepage, so /work/<slug> should 404 rather than render an
// empty case study.
export const dynamicParams = false

const getCaseStudies = () => getAllProjectsMetadata().filter(hasCaseStudy)

export const generateStaticParams = async () =>
  getCaseStudies().map((project) => ({ slug: project.slug }))

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> => {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const title = `${project.title} — ${project.client}`

  const description = project.summary

  return {
    title,
    description,
    twitter: {
      title: `${title} — Edgar López`,
      description,
      card: 'summary_large_image',
    },
    openGraph: {
      title: `${title} — Edgar López`,
      description,
      url: `${SiteURL}/work/${slug}`,
      type: 'article',
    },
    alternates: {
      canonical: `${SiteURL}/work/${slug}`,
      // The same page as plain markdown, for agents that would otherwise pay
      // for the whole DOM to reach the prose. Served by app/llms.md.
      types: {
        'text/markdown': `${SiteURL}/work/${slug}.md`,
      },
    },
  }
}

const Meta = ({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) => (
  <div className="flex flex-col gap-0.5">
    <dt className="text-[13px] text-secondary">{label}</dt>
    <dd className="text-sm text-pretty">{children}</dd>
  </div>
)

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const caseStudies = getCaseStudies()
  const index = caseStudies.findIndex((p) => p.slug === project.slug)
  const newer = index > 0 ? caseStudies.at(index - 1) : null
  const older = caseStudies.at(index + 1) ?? null

  const date = new Date(project.date)

  return (
    <>
      {/* No max-width here: the bands inside `.bands` size themselves, so the
          wide media band can reach past the reading column. */}
      <main className="min-h-screen w-full pb-10">
        <ArticleAside />

        <article className="bands prose">
          {/* not-prose: the typography plugin indents <dd>, and its h1 sizing
              and margins fight the small type this header is built from. */}
          <header className="not-prose pt-14 xl:pt-20">
            <BackLink className="article-aside-fallback" />

            <h1 className="text-lg mb-1 font-semibold">{project.title}</h1>

            {project.summary && (
              <p className="mt-3 text-pretty">{project.summary}</p>
            )}

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t-[0.5px] border-tertiary pt-6 sm:grid-cols-3">
              <Meta label="Company">{project.client}</Meta>

              <Meta label="Date">
                <time dateTime={date.toISOString()}>
                  {date.toLocaleDateString('default', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
              </Meta>

              {/* The homepage links case studies internally, so the live URL
                  would otherwise have nowhere left to surface. */}
              {project.href && (
                <Meta label="Site">
                  <a
                    href={project.href}
                    rel="noopener"
                    className="underline decoration-primary decoration-1 underline-offset-2 transition-colors hover:decoration-secondary"
                  >
                    {new URL(project.href).hostname.replace(/^www\./, '')}
                  </a>
                </Meta>
              )}
            </dl>
          </header>

          {project.content}
        </article>

        <ArticleNav basePath="/work" older={older} newer={newer} />

        <JsonLd schema={projectSchema(project)} />
      </main>

      <PostsFooter />
    </>
  )
}
