import puppeteer from 'puppeteer'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  image?: string | Buffer
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const { href } = req.query
    const image = await getImageBase64(href as string)

    res.setHeader('Cache-Control', 's-maxage=86400')
    res.status(200).json({ image })
  } catch (error) {
    res.status(500).json({
      error: JSON.stringify(error),
    })
  }
}

const getImageBase64 = async (url: string) => {
  if (!url) throw new Error('URL query param is required.')
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)

  await page.setViewport({
    width: 1280,
    height: 800,
  })

  await page.waitForTimeout(250)

  const image = await page.screenshot({
    encoding: 'base64',
    type: 'webp',
    quality: 50,
  })

  await browser.close()
  return image
}
