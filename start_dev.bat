@echo off
echo 🚀 Starting Mchat Frontend Development Server...
echo ===============================================

echo 📦 Installing dependencies if needed...
call npm install

echo 🔧 Starting development server...
echo 🌐 The app will open at http://localhost:3000
echo ⏹️  Press Ctrl+C to stop the server
echo.

call npm start
