import { PostsList } from '@components/posts-list'
import { Header } from '@components/header'
import { HeaderScrollSpy } from '@components/header-scroll-spy'
import { ProjectsList } from '@components/projects-list'
import ChevronDown from '@components/icons/ChevronDown'
import { GithubURL, LinkedinURL, TwitterURL } from '@lib/constants'

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
              product, and marketing.
            </p>

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
              , and{' '}
              <a
                href={LinkedinURL}
                target="_blank"
                rel="noopener"
                className="underline decoration-primary decoration-1 underline-offset-2 transition-colors hover:decoration-secondary"
              >
                LinkedIn
              </a>
              , or explore some of my work on{' '}
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
    </>
  )
}
