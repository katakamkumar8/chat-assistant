# 🚀 How to Run Mchat Application

## ✅ Quick Start

### Method 1: Using the Development Script (Recommended)
```bash
# for Windows
start_dev.bat

# Linux/Mac
chmod +x start_dev.sh
./start_dev.sh
```

### Method 2: Manual Commands
```bash
# Install dependencies (first time only)
npm install

# Start development server
npm start
```

## 🌐 Access the Application

Once running, open your browser and go to:
**http://localhost:3000**

## 🔧 Troubleshooting

### Port Already in Use Error
If you get `EADDRINUSE: address already in use :::3000`:

**Windows:**
```bash
# Find and kill the process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Then start again
npm start
```

**Linux/Mac:**
```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9

# Then start again
npm start
```

### Alternative: Use Different Port
```bash
# Set a different port
set PORT=3001 && npm start
# or
PORT=3001 npm start
```

## 🎯 What You'll See

1. **Chat Interface**: ChatGPT-style interface
2. **Theme Toggle**: Dark/Light mode button
3. **Voice Input**: Microphone button for speech
4. **Suggested Questions**: Click to ask about Mallesh
5. **AI Responses**: Direct answers from Groq AI

## 🧪 Test the Application

Try asking these questions:
- "What are Mallesh's technical skills?"
- "Tell me about his projects"
- "What is his work experience?"
- "What certifications does he have?"

## 🚀 Production Deployment

When ready to deploy:
```bash
# Build for production
npm run build:prod

# Test production build locally
npm run serve
```

## 📱 Features Available

- ✅ **AI Chat**: Direct Groq API integration
- ✅ **Voice Input**: Speech-to-text support
- ✅ **Theme Toggle**: Dark/Light modes
- ✅ **Responsive Design**: Works on mobile
- ✅ **No Backend**: Pure frontend application

## 🎉 Success!

Your Mchat application is now running as a pure frontend React app with direct AI integration!
