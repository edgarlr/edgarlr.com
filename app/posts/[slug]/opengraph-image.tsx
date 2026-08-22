import { OpengraphImage } from '@components/opengraph-image';
import { getPostMetadataBySlug } from '@lib/posts';
import { notFound } from 'next/navigation';

export const runtime = 'nodejs';

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getPostMetadataBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return await OpengraphImage({ title: post.title, date: post.date })
}
