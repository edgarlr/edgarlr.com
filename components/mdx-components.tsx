import { type ComponentProps } from 'react'
import { MDXRemoteProps } from 'next-mdx-remote'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
import {
  Detail,
  DetailProps,
  Gallery,
  GalleryProps,
  Grid,
  GridProps,
  Pair,
  PairProps,
  Video,
  VideoProps,
  Wide,
  WideProps,
} from './media'

/**
 * One map for posts and case studies. The media blocks below reach past the
 * reading column, which only works inside `.bands` (app/globals.css) — both
 * article layouts set it, so a post can reach for a wide block too.
 */
export const components: MDXRemoteProps['components'] = {
  h2: (props) => <h2 {...props} />,
  /**
   * Site-relative prose links route on the client; external URLs and in-page
   * anchors stay a plain <a>, which is what `next/link` would fall back to
   * anyway.
   */
  a: ({ href, ...props }: ComponentProps<'a'>) =>
    href?.startsWith('/') ? (
      <Link href={href} {...props} />
    ) : (
      <a href={href} {...props} />
    ),
  Image: (props: ImageProps) => <Image {...props} alt={props.alt} />,
  Wide: (props: WideProps) => <Wide {...props} />,
  Pair: (props: PairProps) => <Pair {...props} />,
  Gallery: (props: GalleryProps) => <Gallery {...props} />,
  Grid: (props: GridProps) => <Grid {...props} />,
  Detail: (props: DetailProps) => <Detail {...props} />,
  Video: (props: VideoProps) => <Video {...props} />,
}
