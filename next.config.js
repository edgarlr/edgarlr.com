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
  },
}
