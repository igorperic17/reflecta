/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ui-avatars.com'], // Allow images from UI Avatars service
  },
}

module.exports = nextConfig 