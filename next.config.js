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
