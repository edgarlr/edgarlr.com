import Image from 'next/image'
import React from 'react'
import s from './PreviewLink.module.css'

type PreviewLinkImageProps = {
  alt: string
  previewSrc?: string
  previewData?: string | Buffer
}

export const PreviewLinkImage = ({
  previewSrc,
  alt,
  previewData,
}: PreviewLinkImageProps) => {
  if (previewSrc) {
    return (
      <Image
        width={200}
        height={125}
        objectFit="contain"
        className={s.image}
        src={previewSrc}
        alt={alt}
      />
    )
  }

  if (previewData) {
    return (
      <img
        width={200}
        height={125}
        className={s.image}
        src={`data:image/jpeg;base64, ${previewData}`}
        alt={alt}
      />
    )
  }
  return <div className={s.fallback} />
}
