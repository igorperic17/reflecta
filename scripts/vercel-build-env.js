/**
 * This script sets up environment variables to simulate Vercel's production environment
 * Run it before the build to test in conditions similar to Vercel
 */

const fs = require('fs');
const path = require('path');

// Vercel production environment variables
const vercelEnv = {
  NODE_ENV: 'production',
  VERCEL: '1',
  VERCEL_ENV: 'production',
  NEXT_RUNTIME: 'nodejs',
  // Add any other Vercel-specific environment variables here
};

// Create a .env.vercel-build file
const envContent = Object.entries(vercelEnv)
  .map(([key, value]) => `${key}=${value}`)
  .join('\n');

fs.writeFileSync(path.join(process.cwd(), '.env.vercel-build'), envContent);

console.log('✅ Vercel environment variables set up for build simulation'); 