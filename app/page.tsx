
import { PostsList } from "@components/posts-list";
import { Header } from "@components/common/Header";
import { ProjectCard } from "@components/project";
import { SocialLinks } from "@components/social-links";
import projects from "@lib/projects";

export default async function Page() {
  return (
    <>
      <Header title="Edgar López" />
      <main className="w-full mx-auto min-h-screen max-md:px-6 pb-12 max-w-screen-md ">
        <section className="flex flex-col justify-center h-[85vh] md:h-[98vh]">
          <p>
            Hey, I&apos;m Edgar. I build user interfaces, interactions,
            animations, and other web-related stuff.
            <br />
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
          {projects.map((project: TProject) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </section>

        <section className="w-full mx-auto mt-24 mb-28" id="posts" >
          <h2>Posts</h2>
          <PostsList />
        </section>
      </main>
    </>
  )
}

