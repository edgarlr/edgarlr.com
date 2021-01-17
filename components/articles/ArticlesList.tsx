import dateFormatter from '@lib/dateFormatter'
import Link from 'next/link'
import { useState } from 'react'
import { TPost } from 'types'
import s from './ArticlesList.module.css'

type Props = {
  posts: TPost[]
  paginate?: boolean
}

const ArticlesList = ({ posts, paginate }: Props) => {
  const PAGE_MAX = 3
  const [loadedArticles, setLoadedArticles] = useState(PAGE_MAX)

  return (
    <div className={s.root}>
      {posts
        .slice(0, paginate ? loadedArticles : undefined)
        .map(({ slug, date, title }) => (
          <Link href={`/articles/${slug}`} key={slug}>
            <div className={`${s.entry} no-user-select`}>
              <p className={s.title}>{title}</p>
              <p className={`italic ${s.date}`}>{dateFormatter(date)}</p>
            </div>
          </Link>
        ))}

      {paginate && loadedArticles < posts.length && (
        <button
          className={s.button}
          onClick={() => setLoadedArticles(loadedArticles + PAGE_MAX)}
        >
          Load more
        </button>
      )}
    </div>
  )
}

export default ArticlesList
