import ArrowLeft from '@components/icons/ArrowLeft'
import Link from 'next/link'
import cn from 'clsx'

/**
 * The only way out of a post or a case study: the fixed header that used to
 * carry this arrow is gone, and the pair of links at the foot of an article
 * only reaches its neighbours.
 *
 * Rendered twice per article — once at the top of `ArticleAside` and once in
 * the article header — because the aside is fixed and cannot hold the link at
 * the widths where it is hidden. One of the two is always `display: none`, so
 * neither takes a second tab stop.
 */
export const BackLink = ({ className }: { className?: string }) => (
  <Link
    href="/"
    className={cn(
      'group max-md:mb-8 inline-flex items-center gap-1 text-sm text-secondary opacity-60 transition-opacity hover:opacity-100 focus-visible:opacity-100',
      className
    )}
  >
    <ArrowLeft
      width={14}
      height={14}
      className="transition-transform group-hover:-translate-x-1 group-focus-visible:-translate-x-1"
    />
    Home
  </Link>
)
