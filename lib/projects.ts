const projects: TProject[] = [
  {
    slug: 'metria',
    title: 'Metria',
    description: 'Documentation tools for modern workflows',
    tech:
      'React, Next.js, Typescript, Node.js, Prisma, Zod, CSS Modules, Tailwind, ProseMirror, Jest, Cypress, CI/CD, Github Actions.',
    projectUrl: 'https://www.metria.so',
    previewUrl: '/images/metria-preview.png',
    links: [],
  },
  {
    slug: 'magazine',
    title: 'Magazine',
    description: 'Online Magazine Starter Kit',
    tech:
      'React, Next.js, Typescript, StrapiCMS, PWA, CSS Modules, Tailwind, Workbox, IndexedDB, Google Analytics',
    projectUrl: 'https://magazine-starter.vercel.app',
    previewUrl: '/images/magazine-preview.png',
    links: [
      {
        url: 'https://github.com/edgarlr/magazine',
        icon: 'Github',
        title: 'Github (Frontend)',
      },
      {
        url: 'https://github.com/edgarlr/magazine-api',
        icon: 'Github',
        title: 'Github (CMS)',
      },
    ],
  },
  {
    slug: 'podcasts',
    title: 'Podcasts',
    description: 'No auth needed podcasts web app',
    tech: 'React, Typescript, Next.js, SWR, Styled Jsx, Sentry',
    projectUrl: 'https://podcast-app.vercel.app',
    previewUrl: '/images/podcasts-preview.png',
    links: [
      {
        url: 'https://github.com/edgarlr/podcasts',
        icon: 'Github',
        title: 'Github (Webapp)',
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
