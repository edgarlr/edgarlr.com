import { PostsList } from '@components/posts-list'
import { Header } from '@components/header'
import { SocialLinks } from '@components/social-links'
import { HeaderScrollSpy } from '@components/header-scroll-spy'
import { ProjectsList } from '@components/projects-list'
import ChevronDown from '@components/icons/ChevronDown'

export default async function Page() {
  return (
    <>
      <Header title="Edgar López" />

      <main className="w-full mx-auto min-h-screen max-lg:px-6 pb-12 max-w-[70ch]">
        <section className="flex flex-col relative justify-center h-svh">
          <HeaderScrollSpy className="w-px h-px" />
          <p>
            Hey, I&apos;m Edgar. I build user interfaces, interactions,
            animations, and other{' '}
            <span className="whitespace-nowrap">web-related</span> stuff.{' '}
            {/* <br className="hidden 2lg:block" />
            Design engineer at{' '}
            <PreviewLink
              title="PlanetScale"
              href="https://planetscale.com"
              src="/assets/projects/planetscale-homepage.png"
            />
            . */}
          </p>
          <div className="flex mt-2">
            <SocialLinks />
          </div>
          <ChevronDown width={14} height={14} className='text-secondary absolute left-1/2 translate-x-1/2 bottom-10' />

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
