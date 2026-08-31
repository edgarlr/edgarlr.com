import Link from 'next/link'

type NavItem = { slug: string; title: string }

/**
 * The pair of links at the foot of a post or a case study, reaching only its
 * chronological neighbours. `older`/`newer` follow the timeline order, and the
 * links follow the list rather than the dates: the timeline reads newest
 * first, so "Previous" on the left is the newer entry and "Next" on the right
 * is the older one.
 *
 * Shared by `/posts/[slug]` and `/work/[slug]`; `basePath` is the segment they
 * link under (`/posts` or `/work`).
 */
export const ArticleNav = ({
  basePath,
  older,
  newer,
}: {
  basePath: string
  older: NavItem | null | undefined
  newer: NavItem | null | undefined
}) => {
  if (!older && !newer) return null

  return (
    // Sized the way `.bands > *` sizes the reading column, rather than a
    // padded 70ch box — padding inside the cap would inset these links
    // from the text above them between ~70ch and the lg breakpoint.
    <div className="flex justify-between my-16 border-t-[0.5px] border-tertiary pt-16 mx-auto w-[70ch] max-w-[calc(100%-2rem)]">
      {newer ? (
        <Link
          href={`${basePath}/${newer.slug}`}
          className="group max-w-40 md:max-w-60 text-sm"
        >
          <span className="flex text-secondary items-center gap-1 mb-1 transition-colors group-hover:text-primary group-focus-visible:text-primary">
            Previous
          </span>
          <span className="text-pretty">{newer.title}</span>
        </Link>
      ) : (
        <div />
      )}

      {older && (
        <Link
          href={`${basePath}/${older.slug}`}
          className="group max-w-40 md:max-w-60 text-right text-sm"
        >
          <span className="flex text-secondary items-center justify-end gap-1 mb-1 transition-colors group-hover:text-primary group-focus-visible:text-primary">
            Next
          </span>
          <span className="text-pretty">{older.title}</span>
        </Link>
      )}
    </div>
  )
}
