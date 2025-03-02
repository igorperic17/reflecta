/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ui-avatars.com'], // Allow images from UI Avatars service
  },
  experimental: {
    optimizeCss: false, // Disable CSS optimization to fix build error
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
  },
}

module.exports = nextConfig 