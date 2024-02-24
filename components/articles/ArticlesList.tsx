import dateFormatter from '@lib/dateFormatter'
import Link from 'next/link'
import { useRef, useState } from 'react'
import s from './ArticlesList.module.css'

type Props = {
  posts: TPost[]
  paginate?: boolean
}

const ArticlesList = ({ posts, paginate }: Props) => {
  const PAGE_LIMIT = 3
  const [loadedArticles, setLoadedArticles] = useState(PAGE_LIMIT)

  const entryRefs = useRef<Array<HTMLAnchorElement | null>>([])

  const getRootHeight = () => {
    const DEFAULT_ENTRY_HEIGHT = 78
    if (!entryRefs.current || entryRefs.current.length === 0)
      return DEFAULT_ENTRY_HEIGHT * 3

    const heights = entryRefs.current.map(
      (entry) => entry?.getBoundingClientRect().height ?? DEFAULT_ENTRY_HEIGHT,
    )

    return heights.slice(0, loadedArticles).reduce((acc, curr) => acc + curr, 0)
  }

  return (
    <>
      <div
        className={s.root}
        style={
          { '--rootHeight': `${getRootHeight()}px` } as React.CSSProperties
        }
      >
        {posts.map(({ slug, date, title }, i) => (
          <Link
            href={{ pathname: '/articles/[slug]', query: { slug } }}
            key={slug}
            className={`${s.entry} no-user-select`}
            ref={(el) => {
              entryRefs.current[i] = el
            }}
          >
            <time dateTime={new Date(date).toJSON()} className={s.date}>
              {dateFormatter(date)}
            </time>
            <p className={s.title}>{title} </p>
          </Link>
        ))}
      </div>
      {paginate && loadedArticles < posts.length && (
        <div className={s.buttonWrapper}>
          <button
            className={s.button}
            onClick={() => setLoadedArticles(loadedArticles + PAGE_LIMIT)}
          >
            Load more
          </button>
        </div>
      )}
    </>
  )
}

export default ArticlesList
