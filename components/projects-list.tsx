import { PreviewLink } from './preview-link'
import cn from 'clsx'

export const ProjectsList = () => {
  return (
    <ul className="flex flex-col gap-12">
      <ProjectLink
        date="02/01/2024" // Feb 2024
        title="PlanetScale homepage"
        company="PlanetScale"
        href="https://www.planetscale.com"
        src="/assets/projects/planetscale-homepage.png"
      />
      <ProjectLink
        date="11/01/2023" // Nov 2023
        title="Branching page"
        className="sm:invisible"
        company="PlanetScale"
        href="https://www.planetscale.com/features/branching"
        src="/assets/projects/planetscale-branching.png"
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
        className="sm:invisible"
        href="https://intercom.com/customer-support-software"
        src="/assets/projects/intercom-conversational-support.png"
      />

      <ProjectLink
        date="08/01/2021" // August 2021
        title="Pricing page"
        company="Intercom"
        className="sm:invisible"
        href="https://intercom.com/pricing"
        src="/assets/projects/intercom-pricing.jpg"
      />

      <ProjectLink
        date="04/01/2021" // April 2021
        title="Magazine starter"
        company="Open source"
        href="https://magazine-starter.vercel.app/"
        src="/assets/projects/magazine-starter.png"
      />
    </ul>
  )
}

type ProjectLink = {
  date: string
  href: string
  title: string
  company: string
  src: string
  className?: string
}

const ProjectLink = ({
  date: dateProp,
  href,
  title,
  company,
  src,
  className,
}: ProjectLink) => {
  const date = new Date(dateProp)
  return (
    <li className="flex flex-col sm:grid sm:grid-cols-[3fr_9fr] my-0 items-baseline">
      <span className={cn('text-sm text-secondary', className)}>{company}</span>

      <div className="flex flex-col gap-0.5">
        <PreviewLink title={title} src={src} href={href} />

        <time dateTime={date.toISOString()} className="text-xs text-secondary">
          {date.toLocaleDateString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </time>
      </div>
    </li>
  )
}
