import { OpengraphImage } from '@components/opengraph-image'
import { getAllProjectsMetadata, getProjectMetadataBySlug } from '@lib/work'
import { notFound } from 'next/navigation'

export const runtime = 'nodejs'

// Declared inline rather than re-exported from ./page — Next has to parse
// the route segment config statically.
export const dynamicParams = false

export const generateStaticParams = async () =>
  getAllProjectsMetadata()
    .filter((project) => project.hasCaseStudy)
    .map((project) => ({ slug: project.slug }))

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectMetadataBySlug(slug)

  if (!project) {
    notFound()
  }

  return await OpengraphImage({
    title: `${project.title} — ${project.client}`,
    date: project.date,
  })
}
