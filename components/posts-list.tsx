
import dateFormatter from '@lib/date'
import Link from 'next/link'
import { getAllPosts } from '@lib/api'

export const PostsList = () => {
  const posts = getAllPosts(['slug', 'title', 'date'])
  return (
    <ul className='flex flex-col gap-12'>
      {posts.map(({ slug, date, title }) => (
        <li key={slug} className="flex flex-col md:grid md:grid-cols-[3fr_9fr] my-0 items-baseline">
          <time dateTime={new Date(date).toISOString()} className="text-xs text-secondary">
            {dateFormatter(date, {
              month: 'short',
              day: 'numeric',
            })}
          </time>
          <Link
            href={`/articles/${slug}`}
            className="max-md:mt-1 w-fit underline decoration-1 underline-offset-2 transition-colors decoration-secondary hover:decoration-primary"
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  )
}


