/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ui-avatars.com'], // Allow images from UI Avatars service
  },
  experimental: {
    optimizeCss: true, // Enable CSS optimization
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
  },
}

module.exports = nextConfig 