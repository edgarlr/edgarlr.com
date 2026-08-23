import { getAllProjectsMetadata, hasCaseStudy } from '@lib/work'
import { PreviewLink } from './preview-link'
import cn from 'clsx'

export const ProjectsList = () => {
  const projects = getAllProjectsMetadata()

  return (
    <ul className="flex flex-col gap-12">
      {projects.map((project, index) => {
        const date = new Date(project.date)
        // The client label is only shown on the first row of a run, so a
        // repeated client reads as one block at the sm breakpoint and up.
        const repeatsClient = projects[index - 1]?.client === project.client

        // A project with a case-study body links to its own page; everything
        // else keeps pointing at the live site, so case studies can land one
        // at a time without changing how the rest of the list behaves.
        const href = hasCaseStudy(project)
          ? `/work/${project.slug}`
          : project.href

        return (
          <li
            key={project.slug}
            className="flex flex-col  sm:grid sm:grid-cols-[3fr_9fr] my-0 items-baseline"
          >
            <span
              className={cn(
                'text-sm text-secondary',
                repeatsClient && 'sm:invisible',
              )}
            >
              {project.client}
            </span>

            <div className="flex flex-col gap-1 sm:gap-0.5">
              {href ? (
                <PreviewLink
                  title={project.title}
                  src={project.cover}
                  href={href}
                />
              ) : (
                <span className="max-md:mt-1 w-fit">{project.title}</span>
              )}

              <time
                dateTime={date.toISOString()}
                className="text-xs text-secondary"
              >
                {date.toLocaleDateString('default', {
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
