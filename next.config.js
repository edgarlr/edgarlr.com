module.exports = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  async redirects() {
    return [
      {
        source: '/articles/:path*',
        destination: '/posts/:path*',
        permanent: true,
      },
    ]
  },
}
