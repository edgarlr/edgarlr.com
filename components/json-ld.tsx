/**
 * A schema.org graph as a script tag. Rendered in the body rather than the head
 * — Google reads JSON-LD from either, and `generateMetadata` has no field for
 * it, so keeping it beside the markup it describes is the honest place.
 */
export const JsonLd = ({ schema }: { schema: Record<string, unknown> }) => (
  <script
    type="application/ld+json"
    // The object is built in lib/schema.ts from our own frontmatter, so there
    // is no untrusted input here to escape.
    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
  />
)
