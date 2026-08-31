import { JsonLd } from '@components/json-ld'
import { Timeline } from '@components/timeline'
import { GithubURL, LinkedinURL, SiteURL, TwitterURL } from '@lib/constants'
import { personSchema } from '@lib/schema'
import { Metadata } from 'next'

// Every other page sets its own canonical in `generateMetadata`; the homepage
// has no such function, so it declares one here.
export const metadata: Metadata = {
  alternates: {
    canonical: SiteURL,
  },
}

export default async function Page() {
  // No max-width here: the timeline is a `.bands` container, so its featured
  // covers can reach past the reading column the way media does in a post or a
  // case study. Every other section sizes itself.
  return (
    <main className="w-full mx-auto min-h-screen pb-12">
      <section className="flex flex-col relative justify-center h-[85svh] min-h-[25rem] max-h-[50rem] mx-auto w-full max-w-[70ch] max-lg:px-4">
        <div className="flex flex-col gap-4">
          {/* The intro doubles as the page's only heading. It reads as a
              sentence and is styled like one — preflight resets h1 to inherit
              its size and weight, so this renders exactly as the <p> it
              replaced. */}
          <h1 className="text-pretty">
            Hey, I&apos;m Edgar. A designer and engineer working across brand,
            product, and marketing.
          </h1>

          <p className="text-pretty">
            I&apos;m currently a design engineer at{' '}
            <a
              href="https://sequencehq.com"
              target="_blank"
              rel="noopener"
              className="underline decoration-primary decoration-1 underline-offset-2 transition-colors hover:decoration-secondary"
            >
              Sequence
            </a>
            , crafting and building brand identities, marketing sites, product
            interfaces, growth experiments, and campaigns across digital and
            physical.
          </p>

          <p className="text-pretty">
            You can find me on{' '}
            <a
              href={TwitterURL}
              target="_blank"
              rel="noopener"
              className="underline decoration-primary decoration-1 underline-offset-2 transition-colors hover:decoration-secondary"
            >
              X
            </a>
            ,{' '}
            <a
              href={LinkedinURL}
              target="_blank"
              rel="noopener"
              className="underline decoration-primary decoration-1 underline-offset-2 transition-colors hover:decoration-secondary"
            >
              LinkedIn
            </a>
            , and{' '}
            <a
              href={GithubURL}
              target="_blank"
              rel="noopener"
              className="underline decoration-primary decoration-1 underline-offset-2 transition-colors hover:decoration-secondary"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </section>

      {/* Work and writing as one list rather than two sections: they were
          made in the same years, and splitting them by kind buried when
          anything happened. The years are the headings now, so the section
          has none of its own. */}
      <section id="timeline" className="bands mb-28">
        <Timeline />
      </section>

      <JsonLd schema={personSchema()} />
    </main>
  )
}
