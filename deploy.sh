#!/bin/bash

echo "🚀 Building Mchat Frontend Application..."
echo "========================================"

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building production bundle..."
npm run build:prod

echo "✅ Build completed successfully!"
echo "📁 Output files are in the 'dist' folder"
echo "🌐 You can now deploy the 'dist' folder to any static hosting service like:"
echo "   - Netlify"
echo "   - Vercel"  
echo "   - GitHub Pages"
echo "   - AWS S3"
echo "   - Firebase Hosting"
echo "   - Any other static hosting provider"

echo ""
echo "🧪 To test locally, run: npm run serve"
