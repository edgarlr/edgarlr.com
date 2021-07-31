const projects: TProject[] = [
  {
    slug: 'podcasts',
    title: 'Podcasts',
    linkType: 'Live Site',
    description: 'No auth needed podcasts web app',
    tech: 'React, Typescript, Next.js, SWR, Styled Jsx, Sentry',
    projectUrl: 'https://podcast-app.now.sh',
    image: {
      url:
        'https://res.cloudinary.com/dliiwavlg/image/upload/v1615252490/podcasts_dirbxp.png',
      altText: 'Podcast app UI',
    },
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
  {
    slug: 'magazine',
    title: 'Magazine Starter',
    linkType: 'Demo',
    description: 'Online Magazine Starter Kit',
    tech:
      'React, Next.js, Typescript, StrapiCMS, PWA, CSS Modules, Tailwind, Workbox, IndexedDB, Google Analytics',
    projectUrl: 'https://magazine-starter.vercel.app',
    image: {
      url:
        'https://res.cloudinary.com/dliiwavlg/image/upload/v1615423117/magazine_he7vqh.png',
      altText: 'Magazine Homepage',
    },
    links: [
      {
        url: 'https://github.com/edgarlr/magazine',
        icon: 'Github',
        title: 'Frontend Repo',
      },
      {
        url: 'https://github.com/edgarlr/magazine-api',
        icon: 'Github',
        title: 'Strapi CMS Repo',
      },
    ],
  },
  {
    slug: 'papermatter',
    title: 'Paper Matter',
    linkType: 'Live Site',
    description: '3D Visual Studio Website',
    tech: 'React, Gatsby, Styled Components, PropTypes, StrapiCMS',
    projectUrl: 'https://papermatter.xyz',
    image: {
      url:
        'https://res.cloudinary.com/dliiwavlg/image/upload/v1615250890/papermatter_yvsvxc.png',
      altText: 'Papermatter Homepage',
    },
    links: [
      {
        url: 'https://github.com/papermatter/papermatter.xyz',
        icon: 'Github',
        title: 'Website Repo',
      },
    ],
  },
]

export default projects
