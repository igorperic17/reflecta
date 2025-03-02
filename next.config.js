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
    // Disable image optimization to fix production issues
    unoptimized: true,
  },
  // Removing all experimental features
};

module.exports = nextConfig; 