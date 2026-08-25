import { join } from 'path'
import {
  createMdxCollection,
  type MdxEntry,
  type TimelineMetadata,
} from '@lib/mdx'

export type ProjectMetadata = TimelineMetadata & {
  client: string
  /**
   * The paragraph that opens the case study, and its meta description. Written
   * for the project's own page; the timeline shows only a label and a title.
   */
  summary?: string
  // The external URL the timeline links to while a project has no case study
  // of its own. Ignored once the file has a body.
  href?: string
}

export type Project = MdxEntry<ProjectMetadata>

const work = createMdxCollection<ProjectMetadata>(join(process.cwd(), 'work'))

/**
 * A project only gets a /work/[slug] page once its file has a body. Until then
 * the timeline keeps linking to `href`, so case studies can be filled in one at
 * a time without changing how the rest of the list behaves.
 */
export const hasCaseStudy = (project: Project) => project.hasBody

export const getProjectMetadataBySlug = work.getMetadataBySlug
export const getAllProjectsMetadata = work.getAllMetadata
export const getProjectBySlug = work.getBySlug
