import dateFormatter from "@lib/date"
import { PreviewLink } from "./preview-link"

export const ProjectsList = () => {
  return (
    <ul className='flex flex-col gap-12'>
      <ProjectLink
        date="02/02/2024"
        title="PlanetScale Homepage"
        company="PlanetScale"
        href="https://www.planetscale.com"
        src="/assets/projects/planetscale-homepage.png"
      />
      <ProjectLink
        date="03/01/2023" // March 2023
        title="Landing page"
        company="Lapsso"
        href="https://www.laps.so"
        src="/assets/projects/lapsso-landing.png"
      />
      <ProjectLink
        date="04/01/2023" // April 2023
        title="Remote pay strategy guide"
        company="Plane"
        href="https://plane.com/compensation-guide"
        src="/assets/projects/plane-compensation-guide.png"
      />

      <ProjectLink
        date="05/1/2022" // May 2022
        title="Business page"
        company="InDebted"
        href="https://indebted.co/business"
        src="/assets/projects/indebted-business.png"
      />

      <ProjectLink
        date="12/1/2021" // December 2021
        title="Welcome to intercom"
        company="Intercom"
        href="https://intercom.com"
        src="/assets/projects/intercom-welcome-to-intercom.png"
      />

      <ProjectLink
        date="09/1/2021" // Septermber 2021
        title="Conversational support page"
        company="Intercom"
        href="https://intercom.com/customer-support-software"
        src="/assets/projects/intercom-conversational-support.png"
      />

      <ProjectLink
        date="08/01/2021" // August 2021
        title="Pricing page"
        company="Intercom"
        href="https://intercom.com/pricing"
        src="/assets/projects/intercom-pricing.jpg"
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

