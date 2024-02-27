
import { PostsList } from "@components/posts-list";
import { Header } from "@components/header";
import { ProjectCard } from "@components/project";
import { SocialLinks } from "@components/social-links";
import projects from "@lib/projects";
import { HeaderScrollSpy } from "@components/header-scroll-spy";
import { ProjectsList } from "@components/projects-list";

export default async function Page() {
  return (
    <>
      <Header title="Edgar López" />

      <main className="w-full mx-auto min-h-screen max-lg:px-4 pb-12 max-w-screen-md ">
        <section className="flex flex-col justify-center h-[85vh] md:h-[98vh]">
          <HeaderScrollSpy className="w-px h-px" />
          <p>
            Hey, I&apos;m Edgar. I build user interfaces, interactions,
            animations, and other <span className="whitespace-nowrap">web-related</span> stuff.{' '}
            <br className="hidden md:block" />
            Design engineer at{' '}
            <a href="https://planetscale.com" className="relative underline transition-colors decoration-1 underline-offset-2 decoration-black/20 hover:decoration-black/60">
              PlanetScale
            </a>
            .
          </p>
          <div className="flex mt-2">
            <SocialLinks />
          </div>
        </section>

        <section id="projects">
          <ProjectsList />
        </section>

        <section className="w-full mx-auto mt-24 mb-28" id="posts" >
          <h2 className="text-sm font-medium mb-6">Posts</h2>
          <PostsList />
        </section>
      </main>
    </>
  )
}

