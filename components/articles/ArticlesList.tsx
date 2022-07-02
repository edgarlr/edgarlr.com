import ArrowRight from '@components/icons/ArrowRight'
import dateFormatter from '@lib/dateFormatter'
import Link from 'next/link'
import { useState } from 'react'
import s from './ArticlesList.module.css'

type Props = {
  posts: TPost[]
  paginate?: boolean
}

const ArticlesList = ({ posts, paginate }: Props) => {
  const PAGE_MAX = 5
  const [loadedArticles, setLoadedArticles] = useState(PAGE_MAX)

  return (
    <div className={s.root}>
      {posts
        .slice(0, paginate ? loadedArticles : undefined)
        .map(({ slug, date, title }) => (
          <Link href={`/articles/${slug}`} key={slug}>
            <a className={`${s.entry} no-user-select`}>
              <p className={` ${s.date}`}>{dateFormatter(date)}</p>
              <p className={s.title}>
                {title}{' '}
                <span className={s.icon}>
                  <ArrowRight width={18} height={18} />
                </span>
              </p>
            </a>
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
