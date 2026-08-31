import {
  CurrentCompany,
  CurrentCompanyURL,
  CurrentRole,
  DribbbleURL,
  FigmaURL,
  GithubURL,
  LinkedinURL,
  SiteDescription,
  SiteName,
  SiteURL,
  TwitterURL,
} from '@lib/constants'
import type { Post } from '@lib/posts'
import type { Project } from '@lib/work'

/**
 * schema.org objects for the three kinds of page the site has.
 *
 * All URLs are absolute: `metadataBase` resolves relative paths for the
 * metadata API, but JSON-LD is a plain string we serialize ourselves and
 * nothing normalizes it downstream.
 */

const author = {
  '@type': 'Person',
  name: SiteName,
  url: SiteURL,
}

/**
 * The homepage. `sameAs` is what ties the site to the profiles a search engine
 * already knows about, which is most of what this block buys.
 */
export const personSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SiteName,
  url: SiteURL,
  description: SiteDescription,
  jobTitle: CurrentRole,
  worksFor: {
    '@type': 'Organization',
    name: CurrentCompany,
    url: CurrentCompanyURL,
  },
  sameAs: [TwitterURL, LinkedinURL, GithubURL, FigmaURL, DribbbleURL],
})

export const postSchema = (post: Post) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.description,
  datePublished: new Date(post.date).toISOString(),
  url: `${SiteURL}/posts/${post.slug}`,
  // The generated card from app/posts/[slug]/opengraph-image.tsx. Next appends
  // a cache-busting hash to the URL it puts in the meta tag; the route serves
  // the same image without one.
  image: `${SiteURL}/posts/${post.slug}/opengraph-image`,
  author,
  mainEntityOfPage: `${SiteURL}/posts/${post.slug}`,
})

/**
 * `CreativeWork` rather than `Article`: a case study is a record of work that
 * was made, and the page is mostly the work itself. `about` is what carries the
 * client, which is otherwise only in the page's <dl>.
 */
export const projectSchema = (project: Project) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: project.title,
  description: project.summary,
  dateCreated: new Date(project.date).toISOString(),
  url: `${SiteURL}/work/${project.slug}`,
  ...(project.cover && {
    image: new URL(project.cover, SiteURL).toString(),
  }),
  creator: author,
  about: {
    '@type': 'Organization',
    name: project.client,
    ...(project.href && { url: new URL(project.href).origin }),
  },
})
