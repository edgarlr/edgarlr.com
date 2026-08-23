import { PostsList } from '@components/posts-list'
import { Header } from '@components/header'
import { SocialLinks } from '@components/social-links'
import { HeaderScrollSpy } from '@components/header-scroll-spy'
import { ProjectsList } from '@components/projects-list'
import ChevronDown from '@components/icons/ChevronDown'
import { ArrowUpRight } from '@components/icons/ArrowUpRight'

export default async function Page() {
  return (
    <>
      <Header title="Edgar López" />

      <main className="w-full mx-auto min-h-screen max-lg:px-6 pb-12 max-w-[70ch]">
        <section className="flex flex-col relative justify-center h-svh">
          <HeaderScrollSpy className="w-px h-px" />
          <div className="flex flex-col gap-4">
            <p className="text-pretty">
              Hey, I&apos;m Edgar. A designer and engineer working across brand,
              product, marketing, and growth.
            </p>

            <p className="text-pretty">
              From visual identities and art direction to interaction design and
              engineering, shaping marketing sites, digital campaigns, product
              interfaces, growth experiments, and physical assets.
            </p>

            <p className="text-pretty">
              Currently design engineer at{' '}
              <a
                href="https://sequencehq.com"
                target="_blank"
                rel="noopener"
                className="group/link underline decoration-primary decoration-1 underline-offset-2 transition-colors hover:decoration-secondary"
              >
                Sequence
                {/* inline-block keeps the underline from running under the icon */}
                <ArrowUpRight
                  width={14}
                  height={14}
                  className="inline-block ml-px transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                />
              </a>
              .
            </p>
          </div>
          <div className="flex mt-6">
            <SocialLinks />
          </div>
          <ChevronDown width={14} height={14} className='text-secondary absolute left-1/2 -translate-x-1/2 bottom-10' />

        </section>

        <section id="projects" className="mb-28">
          <h2 className="text-sm font-medium mb-6">Projects</h2>
          <ProjectsList />
        </section>

        <section className="w-full mx-auto mb-28" id="posts">
          <h2 className="text-sm font-medium mb-6">Posts</h2>
          <PostsList />
        </section>
      </main>

      <footer className="group flex justify-center relative py-10">
        <SocialLinks />
      </footer>
    </>
  )
}
