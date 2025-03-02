#!/bin/bash

# This is a simplified version that runs in the current directory
# It's faster but less isolated than the full simulation

echo "Setting up Vercel-like environment..."
node scripts/vercel-build-env.js

echo "Running Vercel-like build..."
NODE_ENV=production VERCEL=1 npm run vercel-build

# Check the build status
BUILD_STATUS=$?
if [ $BUILD_STATUS -eq 0 ]; then
  echo "✅ Build successful! Your code should deploy correctly on Vercel."
else
  echo "❌ Build failed with exit code $BUILD_STATUS. Fix the issues before deploying to Vercel."
fi

exit $BUILD_STATUS 