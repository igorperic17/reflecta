#!/bin/bash

# Create a temporary directory for the build
TEMP_DIR=$(mktemp -d)
echo "Created temporary directory: $TEMP_DIR"

# Copy the project files to the temporary directory
echo "Copying project files..."
rsync -av --exclude='node_modules' --exclude='.next' --exclude='.git' ./ $TEMP_DIR/

# Navigate to the temporary directory
cd $TEMP_DIR

# Install dependencies
echo "Installing dependencies..."
npm install

# Set up Vercel-like environment variables
echo "Setting up Vercel environment..."
node scripts/vercel-build-env.js

# Run the build with Vercel-like environment
echo "Running build..."
NODE_ENV=production VERCEL=1 npm run vercel-build

# Check the build status
BUILD_STATUS=$?
if [ $BUILD_STATUS -eq 0 ]; then
  echo "✅ Build successful! Your code should deploy correctly on Vercel."
else
  echo "❌ Build failed with exit code $BUILD_STATUS. Fix the issues before deploying to Vercel."
fi

# Clean up
echo "Cleaning up..."
rm -rf $TEMP_DIR

exit $BUILD_STATUS 