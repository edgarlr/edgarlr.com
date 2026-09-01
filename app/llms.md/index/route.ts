import { llmsIndex } from '@lib/llms'

// The markdown twin of the homepage, reached through the rewrites in
// next.config.js — `/` under `Accept: text/markdown`, and `/index.md`.
//
// The homepage is the timeline, and /llms.txt is already that timeline as
// markdown, so this serves the same body rather than a second rendering of it.
// What differs is the content type: /llms.txt is text/plain by convention, and
// a markdown-negotiated response has to say text/markdown to be one.
export const dynamic = 'force-static'

export function GET() {
  return new Response(llmsIndex(), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      // Declared for the Accept-negotiated form, where this same body is
      // served from `/`.
      Vary: 'Accept',
    },
  })
}
