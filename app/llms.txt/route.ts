import { llmsIndex } from '@lib/llms'

// A GET handler is dynamic by default since Next 15, and this reads the same
// files the pages do — nothing about it is request-shaped.
export const dynamic = 'force-static'

export function GET() {
  return new Response(llmsIndex(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
