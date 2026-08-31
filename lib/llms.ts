import {
  CurrentCompany,
  CurrentRole,
  SiteDescription,
  SiteName,
  SiteURL,
} from '@lib/constants'
import { getRawPostBySlug } from '@lib/posts'
import { getRawProjectBySlug } from '@lib/work'
import {
  entryDate,
  entryHref,
  entryLabel,
  getTimelineEntries,
  type TimelineEntry,
} from '@lib/timeline'

/**
 * The plain-text renderings of the site, for agents: /llms.txt is the index and
 * /llms-full.txt is every word of it.
 *
 * Both walk the same list the homepage does, in the same order, so what an
 * agent reads and what a person sees can't drift. Work and writing are split
 * into two sections here rather than interleaved — a chronology is a reading
 * experience, and a list of links is a lookup table.
 */

/** `entryHref` is site-relative for anything with a page of its own. */
const absoluteHref = (entry: TimelineEntry) => {
  const href = entryHref(entry)

  if (!href) {
    return undefined
  }

  return href.startsWith('/') ? `${SiteURL}${href}` : href
}

/** The one-line blurb an entry carries: a post's meta description, a project's summary. */
const entrySummary = (entry: TimelineEntry) =>
  entry.kind === 'post' ? entry.description : entry.summary

const header = [
  `# ${SiteName}`,
  '',
  `> ${SiteDescription}`,
  '',
  `${CurrentRole} at ${CurrentCompany}. This file covers everything published at ${SiteURL}: case studies of client and personal work, and posts about building for the web.`,
].join('\n')

const linkLine = (entry: TimelineEntry) => {
  const href = absoluteHref(entry)
  const summary = entrySummary(entry)

  // Who a project was for, unless its title already opens with the name —
  // most do, and "Bloques — Bloques documentation platform" reads as a stutter.
  const name =
    entry.kind === 'post' || entry.title.startsWith(entry.client)
      ? entry.title
      : `${entry.client} — ${entry.title}`
  const label = href ? `[${name}](${href})` : name

  return summary ? `- ${label}: ${summary}` : `- ${label}`
}

export const llmsIndex = () => {
  const entries = getTimelineEntries()

  return [
    header,
    '',
    '## Work',
    '',
    ...entries.filter((entry) => entry.kind === 'project').map(linkLine),
    '',
    '## Writing',
    '',
    ...entries.filter((entry) => entry.kind === 'post').map(linkLine),
    '',
    '## Optional',
    '',
    `- [Full text](${SiteURL}/llms-full.txt): every page above, inlined.`,
    '',
  ].join('\n')
}

/**
 * The body as authored. It is MDX rather than plain markdown, so the media
 * blocks arrive as `<Wide>` / `<Video>` / `<Grid>` tags — left as-is on
 * purpose: their `alt` text is the description of the work, and flattening the
 * tags away is the job of the per-page .md routes, not this file.
 */
const rawBody = (entry: TimelineEntry) =>
  entry.kind === 'post'
    ? getRawPostBySlug(entry.slug)?.body
    : getRawProjectBySlug(entry.slug)?.body

const section = (entry: TimelineEntry) => {
  const href = absoluteHref(entry)
  const summary = entrySummary(entry)
  const body = rawBody(entry)

  return [
    `## ${entry.title}`,
    '',
    // The same two facts the timeline shows above a title: who it was for (or
    // that it is writing), and when.
    `${entryLabel(entry)} · ${entryDate(entry)}`,
    ...(href ? [`URL: ${href}`] : []),
    '',
    ...(summary ? [summary, ''] : []),
    ...(body ? [body, ''] : []),
  ].join('\n')
}

export const llmsFull = () =>
  [
    header,
    '',
    // Newest first, the order the homepage puts them in.
    ...getTimelineEntries().map(section),
  ].join('\n')
