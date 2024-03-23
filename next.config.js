/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['res.cloudinary.com'],
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
  experimental: {
    outputFileTracingIncludes: {
      '/posts/*': ['./posts/**/*'],
    },
  },
}
