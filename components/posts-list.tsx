import { getAllPostsMetadata } from '@lib/posts'
import Link from 'next/link'

export const PostsList = async () => {
  const posts = await getAllPostsMetadata()

  return (
    <ul className="flex flex-col gap-12">
      {posts.map((post) => {
        const date = new Date(post.date)
        return (
          <li
            key={post.slug}
            className="flex flex-col  sm:grid sm:grid-cols-[3fr_9fr] my-0 items-baseline"
          >
            <time
              dateTime={date.toISOString()}
              className="text-xs text-secondary"
            >
              {date.toLocaleDateString('default', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
            <Link
              href={`/posts/${post.slug}`}
              className="max-md:mt-1 w-fit underline decoration-1 transition-colors underline-offset-2 decoration-primary hover:decoration-secondary"
            >
              {post.title}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}