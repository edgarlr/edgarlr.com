import { BackLink } from '@components/back-link'

/**
 * The left column beside a post or a case study — see `.article-aside` in
 * `app/globals.css` for why it is fixed rather than a grid track, and for the
 * width it needs before it appears.
 *
 * Carries the back link, and is where the table of contents goes.
 */
export const ArticleAside = ({ children }: { children?: React.ReactNode }) => (
  <aside className="article-aside">
    <BackLink />
    {children}
  </aside>
)
