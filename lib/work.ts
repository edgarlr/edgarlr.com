import { createMdxCollection, type MdxEntry } from '@lib/mdx'

export type ProjectMetadata = {
  title: string
  client: string
  date: string
  cover: string
  summary?: string
  // Both render in the case-study header when set. Nothing sets them yet —
  // Edgar would rather not list a role or disciplines per project — but the
  // header handles them, so turning them on is a frontmatter edit.
  role?: string
  disciplines?: string[]
  // The external URL the homepage list links to while a project has no
  // case study of its own. Ignored once the file has a body.
  href?: string
}

export type Project = MdxEntry<ProjectMetadata>

const work = createMdxCollection<ProjectMetadata>('work')

/**
 * A project only gets a /work/[slug] page once its file has a body. Until then
 * the homepage keeps linking to `href`, so case studies can be filled in one at
 * a time without changing how the rest of the list behaves.
 */
export const hasCaseStudy = (project: Project) => project.hasBody

export const getProjectMetadataBySlug = work.getMetadataBySlug
export const getAllProjectsMetadata = work.getAllMetadata
export const getProjectBySlug = work.getBySlug
