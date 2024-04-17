/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.kdrive.infomaniak.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cms.msvs.ch',
        port: '',
        pathname: '/storage/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig
