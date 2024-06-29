/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    appDir: true,
  },
  images: {
    domains:[
      "lh3.googleusercontent.com"
    ]
  }
}

module.exports = nextConfig
