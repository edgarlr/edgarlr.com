
import { MDXRemoteProps } from 'next-mdx-remote'
import Image, { ImageProps } from 'next/image'

export const components: MDXRemoteProps["components"] = {
  h2: (props) => <h2 {...props} />,
  Image: (props: ImageProps) => <Image {...props} alt={props.alt} />
}

