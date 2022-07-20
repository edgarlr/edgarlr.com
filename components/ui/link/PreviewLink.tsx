import {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  FC,
  useEffect,
  useState,
} from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'
import s from './PreviewLink.module.css'
import { PreviewLinkImage } from './PreviewLinkImage'

type LinkPreviewProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {
  previewSrc?: string
}

export const LinkPreview: FC<LinkPreviewProps> = ({
  href,
  children,
  className = '',
  previewSrc,
  ...rest
}) => {
  const [previewData, setPreviewData] = useState('')

  useEffect(() => {
    if (previewSrc) return

    const getImage = async () => {
      const response = await fetch(`/api/link-preview?href=${href}`)
      const { image } = await response.json()
      setPreviewData(image)
    }

    getImage()
    return () => setPreviewData('')
  }, [href])

  return (
    <Tooltip.Provider delayDuration={75} skipDelayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <a href={href} className={className} {...rest}>
            {children}
          </a>
        </Tooltip.Trigger>
        <Tooltip.Content side="right" sideOffset={12} className={s.content}>
          <PreviewLinkImage
            previewSrc={previewSrc}
            previewData={previewData}
            alt="Image alt"
          />
          <Tooltip.Arrow className={s.arrow} />
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
