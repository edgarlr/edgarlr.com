/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    // Next 16 defaults images.qualities to [75]; the preview cards use quality={100}
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      // The Bunny pull zone is only ever reached through this custom domain —
      // its edgarlr-cdn.b-cdn.net hostname is deliberately not allowed, so a
      // raw pull-zone URL fails the build instead of quietly splitting the
      // image cache across two origins.
      {
        protocol: 'https',
        hostname: 'cdn.edgarlr.com',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/',
          has: [
            {
              type: 'header',
              key: 'accept',
              value: '.*text/markdown.*',
            },
          ],
          destination: '/llms.md/index',
        },
        {
          source: '/posts/:slug',
          has: [
            {
              type: 'header',
              key: 'accept',
              value: '.*text/markdown.*',
            },
          ],
          destination: '/llms.md/posts/:slug',
        },
        {
          source: '/work/:slug',
          has: [
            {
              type: 'header',
              key: 'accept',
              value: '.*text/markdown.*',
            },
          ],
          destination: '/llms.md/work/:slug',
        },
      ],
      afterFiles: [
        {
          source: '/index.md',
          destination: '/llms.md/index',
        },
        {
          source: '/posts/:slug\\.md',
          destination: '/llms.md/posts/:slug',
        },
        {
          source: '/work/:slug\\.md',
          destination: '/llms.md/work/:slug',
        },
      ],
    }
  },
  async headers() {
    return [
      {
        // The entry point an agent lands on first. Both relations are IANA
        // registered: `alternate` is the same page in another format,
        // `describedby` is the index of everything the site holds. A crawler
        // that reads only the headers still finds both without guessing at
        // /llms.txt.
        source: '/',
        headers: [
          {
            key: 'Link',
            value: [
              '<https://www.edgarlr.com/index.md>; rel="alternate"; type="text/markdown"',
              '<https://www.edgarlr.com/llms.txt>; rel="describedby"; type="text/plain"',
            ].join(', '),
          },
        ],
      },
      {
        // The slug pattern excludes the .md form so this only ever lands on
        // the HTML page — otherwise the Link below would point at `.md.md`.
        source: '/:collection(posts|work)/:slug((?!.*\\.md$)[^/]+)',
        headers: [
          {
            key: 'Link',
            value:
              '<https://www.edgarlr.com/:collection/:slug.md>; rel="alternate"; type="text/markdown"',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/posts/react-automatic-slider-pure-css',
        destination: '/posts/infinite-marquee-animation',
        permanent: true,
      },
      {
        source: '/articles/:path*',
        destination: '/posts/:path*',
        permanent: true,
      },
    ]
  },
  outputFileTracingIncludes: {
    '/posts/*': ['./posts/**/*'],
    '/work/*': ['./work/**/*'],
    // These four read both collections. They prerender, so tracing should not
    // be load-bearing — it is here so a future change that makes one of them
    // dynamic fails loudly at build rather than 500ing on the first request.
    '/sitemap.xml': ['./posts/**/*', './work/**/*'],
    '/llms.txt': ['./posts/**/*', './work/**/*'],
    '/llms-full.txt': ['./posts/**/*', './work/**/*'],
    '/': ['./posts/**/*', './work/**/*'],
    '/llms.md/index': ['./posts/**/*', './work/**/*'],
    '/llms.md/posts/*': ['./posts/**/*'],
    '/llms.md/work/*': ['./work/**/*'],
  },
}
