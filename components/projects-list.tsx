import dateFormatter from "@lib/date"
import { PreviewLink } from "./preview-link"

export const ProjectsList = () => {
  return (
    <ul className='flex flex-col gap-8'>
      <ProjectLink
        date="02/02/2024"
        title="PlanetScale Homepage"
        company="PlanetScale"
        href="https://www.planetscale.com"
        src="/assets/projects/planetscale-homepage.png"
      />
      <ProjectLink
        date="10/10/2023"
        title="Landing page"
        company="Lapsso"
        href="https://www.laps.so"
        src="/assets/projects/lapsso-landing.png"
      />
      <ProjectLink
        date="10/10/2023"
        title="Remote pay strategy guide"
        company="Plane"
        href="https://plane.com/compensation-guide"
        src="/assets/projects/plane-compensation-guide.png"
      />
    </ul>
  )
}

type ProjectLink = {
  date: string,
  href: string,
  title: string,
  company: string,
  src: string,
}

const ProjectLink = ({ date, href, title, company, src }: ProjectLink) => {
  return (
    <li className="flex flex-col md:grid md:grid-cols-[3fr_9fr] my-0 items-end">
      <time dateTime={new Date(date).toISOString()} className="text-xs text-secondary">
        {dateFormatter(date, { month: 'long', year: 'numeric' })}
      </time>
      <div className="flex flex-col">
        <span className="text-xs text-secondary">{company}</span>
        <PreviewLink title={title} src={src} href={href} />
      </div>
    </li>
  )
}

