import { ArticleAside } from '@components/article-aside'
import { BackLink } from '@components/back-link'
import ArrowLeft from '@components/icons/ArrowLeft'
import ArrowRight from '@components/icons/ArrowRight'
import { PostsFooter } from '@components/footer'
import {
  getAllProjectsMetadata,
  getProjectBySlug,
  hasCaseStudy,
} from '@lib/work'
import { SiteURL } from '@lib/constants'
import { Metadata } from 'next'
import Link from 'next/link'
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
  <div className="flex flex-col gap-1">
    <dt className="text-xs text-secondary">{label}</dt>
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
          <header className="not-prose mt-24 mb-12 md:mt-28">
            <BackLink className="article-aside-fallback" />
            <p className="mb-1 text-sm text-secondary">{project.client}</p>
            <h1 className="text-lg font-semibold">{project.title}</h1>

            {project.summary && (
              <p className="mt-4 text-pretty">{project.summary}</p>
            )}

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t-[0.5px] border-tertiary pt-6 sm:grid-cols-4">
              <Meta label="Client">{project.client}</Meta>

              <Meta label="Date">
                <time dateTime={date.toISOString()}>
                  {date.toLocaleDateString('default', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
              </Meta>

              {project.role && <Meta label="Role">{project.role}</Meta>}

              {project.disciplines && project.disciplines.length > 0 && (
                <Meta label="Disciplines">
                  <ul>
                    {project.disciplines.map((discipline) => (
                      <li key={discipline}>{discipline}</li>
                    ))}
                  </ul>
                </Meta>
              )}

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

        {(older || newer) && (
          // Sized the way `.bands > *` sizes the reading column, rather than a
          // padded 70ch box — padding inside the cap would inset these links
          // from the text above them between ~70ch and the lg breakpoint.
          <div className="mx-auto my-20 flex w-[70ch] max-w-[calc(100%-3rem)] justify-between">
            {older ? (
              <Link
                href={`/work/${older.slug}`}
                className="group max-w-40 text-sm opacity-60 transition-opacity hover:opacity-100 md:max-w-60"
              >
                <span className="mb-1 flex items-center gap-1.5 font-medium">
                  <ArrowLeft
                    width={16}
                    height={16}
                    className="transition-transform group-hover:-translate-x-1.5 group-focus-visible:-translate-x-1.5"
                  />
                  Older
                </span>
                <span className="text-pretty text-secondary">
                  {older.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {newer && (
              <Link
                href={`/work/${newer.slug}`}
                className="group max-w-40 text-right text-sm opacity-60 transition-opacity hover:opacity-100 md:max-w-60"
              >
                <span className="mb-1 flex items-center justify-end gap-1.5 font-medium">
                  Newer
                  <ArrowRight
                    width={16}
                    height={16}
                    className="transition-transform group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5"
                  />
                </span>
                <span className="text-pretty text-secondary">
                  {newer.title}
                </span>
              </Link>
            )}
          </div>
        )}
      </main>

      <PostsFooter />
    </>
  )
}
