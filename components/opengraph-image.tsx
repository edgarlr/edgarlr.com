import 'server-only'
import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import React from 'react'

const interRegular = readFile(join(process.cwd(), 'public/fonts/Inter-Regular.ttf'))

export const OpengraphImage = async ({ date: dateProp, title }: { title?: string, date?: string }) => {
  const date = new Date(dateProp ?? '').toLocaleDateString('default', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return new ImageResponse(
    (
      <div style={{ background: '#181A1B' }} tw="flex h-full w-full text-[#F2F2F2] flex-col px-48 py-24 justify-end">
        {<p tw="mb-4 leading-tight text-6xl text-pretty">{title}</p>}
        {date && <div tw="text-[#f2f2f299] text-2xl">{date}</div>}

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
      ],
    }
  );

}
