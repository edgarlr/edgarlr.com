import fs from 'fs'
import { type ReactElement } from 'react'
import { join } from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import { components } from '@components/mdx-components'
import { compileOptions } from '@lib/mdx'

const workDirectory = join(process.cwd(), 'work')

const getProjectSource = (slug: string) => {
  const fullPath = join(workDirectory, `${slug}.mdx`)
  return fs.readFileSync(fullPath, 'utf8')
}

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

export type Project = ProjectMetadata & {
  slug: string
  // A project only gets a /work/[slug] page once its file has a body. Until
  // then the homepage keeps linking to `href`, so case studies can be filled
  // in one at a time.
  hasCaseStudy: boolean
}

export type ProjectWithContent = Project & { content: ReactElement }

export const getProjectMetadataBySlug = (slug: string) => {
  try {
    // Only the frontmatter is needed here, so parse it instead of compiling the
    // whole document the way lib/posts.ts does.
    const { data, content } = matter(getProjectSource(slug))

    return {
      ...(data as ProjectMetadata),
      slug,
      hasCaseStudy: content.trim().length > 0,
    }
  } catch (error) {
    return undefined
  }
}

export function getAllProjectsMetadata() {
  const slugs = fs
    .readdirSync(workDirectory)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''))

  const projects = slugs
    .map((slug) => getProjectMetadataBySlug(slug))
    .filter((project): project is Project => project !== undefined)

  return projects.sort((project1, project2) => {
    const date1 = new Date(project1.date).getTime()
    const date2 = new Date(project2.date).getTime()
    return date1 < date2 ? 1 : -1
  })
}

export async function getProjectBySlug(
  slug: string
): Promise<ProjectWithContent | undefined> {
  try {
    const source = getProjectSource(slug)

    const { frontmatter, content } = await compileMDX<ProjectMetadata>({
      options: compileOptions,
      source,
      components,
    })

    return {
      ...frontmatter,
      slug,
      hasCaseStudy: true,
      content,
    }
  } catch (error) {
    return undefined
  }
}
