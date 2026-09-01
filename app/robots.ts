import type { MetadataRoute } from 'next'
import { SiteURL } from '@lib/constants'

/**
 * Nothing here is private, so this exists to carry the `Sitemap:` line and the
 * content signals.
 *
 * Deliberately no per-agent rules: disallowing an AI crawler doesn't send it to
 * /llms.txt instead, it just drops the site from what that model can cite.
 *
 * The signals say the same thing in the vocabulary a crawler reads: index it,
 * quote it live, don't train on it. `ai-input=yes` is the one that matters —
 * it's the permission the .md routes and /llms.txt were built to serve, and
 * withholding it while publishing them would be a contradiction.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Not a standard robots.txt directive, so it rides the passthrough:
      // https://contentsignals.org
      other: { 'Content-Signal': 'search=yes, ai-input=yes, ai-train=no' },
    },
    sitemap: `${SiteURL}/sitemap.xml`,
  }
}
