/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'localhost',
      'flowbite',
      'd849-2804-29b8-513a-40c0-92b7-d728-704b-68c3.sa.ngrok.io',
    ],
  },
}

module.exports = nextConfig
