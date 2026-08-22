import { OpengraphImage } from '@components/opengraph-image';
import { getPostMetadataBySlug } from '@lib/posts';
import { notFound } from 'next/navigation';

export const runtime = 'nodejs';

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostMetadataBySlug(slug)

  if (!post) {
    notFound()
  }

  return await OpengraphImage({ title: post.title, date: post.date })
}
