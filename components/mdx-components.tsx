import { MDXRemoteProps } from 'next-mdx-remote'
import Image, { ImageProps } from 'next/image'
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
  Image: (props: ImageProps) => <Image {...props} alt={props.alt} />,
  Wide: (props: WideProps) => <Wide {...props} />,
  Pair: (props: PairProps) => <Pair {...props} />,
  Gallery: (props: GalleryProps) => <Gallery {...props} />,
  Grid: (props: GridProps) => <Grid {...props} />,
  Detail: (props: DetailProps) => <Detail {...props} />,
  Video: (props: VideoProps) => <Video {...props} />,
}
