import 'server-only'
import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import React from 'react'

const interRegular = readFile(join(process.cwd(), 'public/fonts/Inter-Regular.ttf'))
const newsreaderItalic = readFile(join(process.cwd(), 'public/fonts/Newsreader-Italic.ttf'))

export const OpengraphImage = async ({ date: dateProp, title }: { title?: string, date?: string }) => {
  const date = new Date(dateProp ?? '').toLocaleDateString('default', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return new ImageResponse(
    (
      <div style={{ background: 'radial-gradient(100% 100% at 50% 0%,#FFF,#FAFAFA)' }} tw="flex h-full w-full text-[#131414] flex-col px-48 justify-center">
        {<p className=' ' style={{ fontFamily: 'Newsreader' }} tw="mb-5 italic leading-tight text-5xl">{title}</p>}
        {date && <div tw="opacity-60 text-2xl">{date}</div>}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: await interRegular,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Newsreader',
          data: await newsreaderItalic,
          style: 'italic',
          weight: 400,
        },
      ],
    }
  );

}
