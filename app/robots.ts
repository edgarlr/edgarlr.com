import type { MetadataRoute } from 'next'
import { SiteURL } from '@lib/constants'

/**
 * Nothing here is private, so this exists to carry the `Sitemap:` line.
 *
 * Deliberately no per-agent rules: disallowing an AI crawler doesn't send it to
 * /llms.txt instead, it just drops the site from what that model can cite.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SiteURL}/sitemap.xml`,
  }
}
