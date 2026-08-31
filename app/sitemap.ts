import type { MetadataRoute } from 'next'
import { SiteURL } from '@lib/constants'
import { getAllPostsMetadata } from '@lib/posts'
import { getAllProjectsMetadata, hasCaseStudy } from '@lib/work'
import { getTimelineEntries } from '@lib/timeline'

/**
 * Every page the site has: the homepage, one per post, and one per project
 * that has earned a page. Projects without a case study are deliberately left
 * out — `/work/<slug>` 404s for them (`dynamicParams = false` in
 * app/work/[slug]/page.tsx), so listing them would submit dead URLs.
 *
 * `lastModified` comes from frontmatter rather than the file's mtime: a typo
 * fix shouldn't tell a crawler the piece was rewritten, and mtime isn't stable
 * across a fresh clone on a build machine anyway.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostsMetadata().map((post) => ({
    url: `${SiteURL}/posts/${post.slug}`,
    lastModified: new Date(post.date),
  }))

  const caseStudies = getAllProjectsMetadata()
    .filter(hasCaseStudy)
    .map((project) => ({
      url: `${SiteURL}/work/${project.slug}`,
      lastModified: new Date(project.date),
    }))

  // The homepage is the timeline, so it changes when the newest entry does —
  // including the projects that link out and never get a page of their own.
  const [newest] = getTimelineEntries()

  return [
    {
      url: SiteURL,
      lastModified: new Date(newest.date),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...caseStudies,
    ...posts,
  ]
}
