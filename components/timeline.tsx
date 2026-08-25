import Image from 'next/image'
import Link from 'next/link'
import cn from 'clsx'
import {
  entryDate,
  entryHref,
  entryKey,
  entryLabel,
  getTimelineEntries,
  isFeatured,
  type TimelineEntry,
} from '@lib/timeline'

/**
 * Projects and posts as one chronological list.
 *
 * Emits every entry as a direct child of the section rather than wrapping the
 * list in a <ul>: a band class only takes effect on a direct child of `.bands`
 * (app/globals.css), so an element in between would cap featured covers at the
 * reading column. That is also why the spacing between entries is a margin on
 * each one instead of a `gap` on a flex parent.
 *
 * No year headings: each entry carries its own date beside its label, which
 * keeps the list one uninterrupted column and lets a year with a single entry
 * cost a line rather than a heading.
 */
export const Timeline = () => {
  const entries = getTimelineEntries()

  return (
    <>
      {entries.map((entry, index) => {
        const props = { entry, first: index === 0 }

        return isFeatured(entry) ? (
          <FeaturedEntry key={entryKey(entry)} {...props} entry={entry} />
        ) : (
          <EntryRow key={entryKey(entry)} {...props} />
        )
      })}
    </>
  )
}

/** The section above already sets the gap, so the first entry adds none. */
const entryClassName = (first: boolean, className?: string) =>
  cn(first ? 'mt-0' : 'mt-12', className)



/**
 * Who the entry was for and when, above the title — the same order the case
 * study header uses, so an entry reads as a preview of the page it opens.
 */
const Label = ({ entry }: { entry: TimelineEntry }) => (
  <span className="text-sm text-secondary">
    {entryLabel(entry)} &middot;{' '}
    <time dateTime={new Date(entry.date).toISOString()} className="tabular-nums">
      {entryDate(entry)}
    </time>
  </span>
)

/**
 * An entry that leads with its cover. Title and label only; the page behind it
 * carries everything else.
 */
const FeaturedEntry = ({
  entry,
  first,
}: {
  entry: TimelineEntry & { cover: string }
  first: boolean
}) => {
  const href = entryHref(entry)

  const cover = (
    <div className="relative aspect-[5/3] w-full overflow-hidden rounded-md border-[0.5px] border-tertiary">
      <Image
        src={entry.cover}
        alt=""
        fill
        quality={100}
        // One cover across the full wide band. The breakpoint is where
        // `band-wide` stops being gutter-bound: `--band-wide` + two
        // `--band-gutter`s in app/globals.css.
        sizes="(min-width: 59rem) 56rem, 100vw"
        className="object-cover"
      />
    </div>
  )

  // Held to the reading column even though the cover reaches past it, so the
  // section keeps one text axis: card labels and rows all line up.
  // `--band-prose` rather than a literal 70ch — it is registered as a length in
  // app/globals.css, so it resolves once against `.bands` own font instead of
  // against whatever type this label happens to be set in.
  const meta = (
    <div className="mx-auto mt-3 flex w-full max-w-[var(--band-prose)] flex-col gap-1 sm:gap-0.5">

      <span
        className={cn(
          'w-fit',
          href &&
          'hover:underline text-sm decoration-primary decoration-1 underline-offset-2 transition-colors group-hover:decoration-secondary group-focus-visible:decoration-secondary',
        )}
      >
        {entry.title}
      </span>
      <Label entry={entry} />
    </div>
  )

  return (
    <article className={entryClassName(first, 'band-wide')}>
      {href ? (
        <Link href={href} rel="noopener" className="group block">
          {cover}
          {meta}
        </Link>
      ) : (
        <>
          {cover}
          {meta}
        </>
      )}
    </article>
  )
}

/**
 * Everything not featured: the same title and label, without the cover taking
 * up the room.
 *
 * No hover preview. A row used to peek at its cover on hover, back when a
 * project's title led off-site and the peek was the only way to see the work
 * without leaving. Every project has a page of its own now, so the peek buys a
 * glance at one screenshot in exchange for a card that covers the entries
 * either side of it — and the page it hides is one click away.
 *
 * `PreviewLink` still exists for prose, where an inline peek doesn't sit on top
 * of a list.
 */
const EntryRow = ({
  entry,
  first,
}: {
  entry: TimelineEntry
  first: boolean
}) => {
  const href = entryHref(entry)

  return (
    <article className={entryClassName(first)}>
      <div className="flex flex-col gap-1 sm:gap-0.5">


        {href ? (
          <Link
            href={href}
            rel="noopener"
            className="w-fit text-sm hover:underline decoration-primary decoration-1 underline-offset-2 transition-colors hover:decoration-secondary max-md:mt-1"
          >
            {entry.title}
          </Link>
        ) : (
          <span className="w-fit max-md:mt-1">{entry.title}</span>
        )}

        <Label entry={entry} />

      </div>
    </article>
  )
}
