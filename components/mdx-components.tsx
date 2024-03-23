
import { MDXRemoteProps } from 'next-mdx-remote'
import Image, { ImageProps } from 'next/image'
import { PreviewLink, PreviewLinkProps } from './preview-link'
import { MediaComparison, MediaComparisonProps } from './media-comparison'

export const components: MDXRemoteProps["components"] = {
  h2: (props) => <h2 {...props} />,
  Image: (props: ImageProps) => <Image {...props} alt={props.alt} />,
  PreviewLink: (props: PreviewLinkProps) => <PreviewLink {...props} />,
  MediaComparison: (props: MediaComparisonProps) => <MediaComparison {...props} />
}
