/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Replace domains with remotePatterns for better security and flexibility
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        pathname: '**',
      },
    ],
    // Ensure local images are properly optimized
    unoptimized: false,
  },
  // Removing all experimental features
};

module.exports = nextConfig; 