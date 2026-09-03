import { getAllPostsMetadata, type Post } from '@lib/posts'
import { getAllProjectsMetadata, hasCaseStudy, type Project } from '@lib/work'

/**
 * One entry in the homepage timeline. The `kind` tag is the only thing the
 * timeline needs the two collections to disagree about: it decides where the
 * title points, and nothing else. Everything the list renders comes from the
 * shared `TimelineMetadata` fields.
 */
export type TimelineEntry =
  ({ kind: 'project' } & Project) | ({ kind: 'post' } & Post)

/**
 * Every project is dated to the first of its month, so a project and a post can
 * land on the same day. Falling back to the slug keeps that pair in the same
 * order between builds instead of leaving it to the order they were concatenated
 * in.
 */
const byNewest = (a: TimelineEntry, b: TimelineEntry) => {
  const difference = new Date(b.date).getTime() - new Date(a.date).getTime()

  return difference !== 0 ? difference : a.slug.localeCompare(b.slug)
}

/**
 * A featured entry leads with its cover. The cover check is not a formality:
 * `cover` is optional so a post can land before its art does, and a featured
 * flag on an entry without one would render an empty card.
 */
export const isFeatured = (
  entry: TimelineEntry,
): entry is TimelineEntry & { cover: string } =>
  Boolean(entry.featured && entry.cover)

/**
 * The small label above an entry's title: who a project was for, or the fact
 * that a post is writing rather than client work. Free for every entry — a
 * client comes straight from frontmatter and a post's label from its kind — so
 * every entry carries one without any copy being written for it.
 *
 * "Writing" rather than "Post": the slot holds a body of work, and a content
 * type stacked next to a client name reads as two different kinds of fact.
 */
export const entryLabel = (entry: TimelineEntry) =>
  entry.kind === 'post' ? 'Writing' : entry.client

/**
 * Where an entry's title points. Posts always have a page; a project only gets
 * one once its file has a body, and keeps pointing at the live site until then.
 */
export const entryHref = (entry: TimelineEntry) => {
  if (entry.kind === 'post') {
    return `/posts/${entry.slug}`
  }

  return hasCaseStudy(entry) ? `/work/${entry.slug}` : entry.href
}

/**
 * Prefixed by kind because the two collections could otherwise share a slug.
 */
export const entryKey = (entry: TimelineEntry) => `${entry.kind}-${entry.slug}`

/**
 * When the entry landed, sat beside its label. Same shape for a project and a
 * post: the list is one column and a date that changed format by kind would
 * read as two.
 *
 * Pinned to en-US rather than the runtime default so the month reads the same
 * in the prerendered HTML as it does wherever the build happens to run.
 */
export const entryDate = (entry: TimelineEntry) => {
  const date = new Date(entry.date)
  const year = date.getFullYear()

  return `${date.toLocaleDateString('en-US', { month: 'long' })} ${year}`
}

/** Projects alone, newest first. */
export const getWorkEntries = (): TimelineEntry[] =>
  getAllProjectsMetadata()
    .map((project) => ({ kind: 'project' as const, ...project }))
    .sort(byNewest)

/** Posts alone, newest first. */
export const getWritingEntries = (): TimelineEntry[] =>
  getAllPostsMetadata()
    .map((post) => ({ kind: 'post' as const, ...post }))
    .sort(byNewest)

/**
 * Projects and posts as one list, newest first. Both collections already sort
 * newest-first on their own, so this only has to merge them.
 */
export const getTimelineEntries = (): TimelineEntry[] =>
  [...getWorkEntries(), ...getWritingEntries()].sort(byNewest)
