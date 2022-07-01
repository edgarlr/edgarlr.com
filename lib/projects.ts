const projects: TProject[] = [
  {
    slug: 'metria',
    title: 'Metria',
    description: 'Documentation tools for modern workflows',
    tech:
      'React, Next.js, Typescript, TurboRepo, CSS Modules, Tailwind, ProseMirror, Node.js, Prisma, UI component Library, Auth, Jest, Cypress, CI/CD Github Actions.',
    projectUrl: 'https://www.metria.so',
    links: [],
  },
  {
    slug: 'magazine',
    title: 'Magazine',
    description: 'Online Magazine Starter Kit',
    tech:
      'React, Next.js, Typescript, StrapiCMS, PWA, CSS Modules, Tailwind, Workbox, IndexedDB, Google Analytics',
    projectUrl: 'https://magazine-starter.vercel.app',
    links: [
      {
        url: 'https://github.com/edgarlr/magazine',
        icon: 'Github',
        title: 'Web',
      },
      {
        url: 'https://github.com/edgarlr/magazine-api',
        icon: 'Github',
        title: 'CMS',
      },
    ],
  },
  {
    slug: 'podcasts',
    title: 'Podcasts',
    description: 'No auth needed podcasts web app',
    tech: 'React, Typescript, Next.js, SWR, Styled Jsx, Sentry',
    projectUrl: 'https://podcast-app.now.sh',
    links: [
      {
        url: 'https://github.com/edgarlr/podcasts',
        icon: 'Github',
        title: 'Github Repo',
      },
      {
        url:
          'https://www.figma.com/community/file/945882274406205263/Podcasts---UI-Kit',
        icon: 'Figma',
        title: 'Figma File',
      },
    ],
  },
]

export default projects
