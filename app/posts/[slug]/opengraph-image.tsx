import { OpengraphImage } from '@components/opengraph-image';
// import { getPostMetadataBySlug } from '@lib/posts';

export const runtime = 'nodejs';

export default async function Image({ params }: { params: { slug: string } }) {
  // const post = await getPostMetadataBySlug(params.slug)

  return await OpengraphImage({ title: "post?.title", date: "02/02/2020" })
}
