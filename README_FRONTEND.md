# Mchat Frontend Chat Application

A pure frontend React application that provides an AI-powered chat interface for candidate information. This application uses Groq AI directly from the frontend, making deployment simple and cost-effective.

## 🚀 Features

- **Pure Frontend**: No backend server required
- **AI Integration**: Direct integration with Groq AI API
- **Modern UI**: ChatGPT-style interface with dark/light themes
- **Voice Input**: Speech-to-text support
- **Responsive Design**: Works on desktop and mobile
- **Easy Deployment**: Deploy to any static hosting service

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Groq API key (get one at [console.groq.com](https://console.groq.com))

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Mchat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example file
   cp env.example env.local
   
   # Edit env.local and add your Groq API key
   REACT_APP_GROQ_API_KEY=your_groq_api_key_here
   ```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm start
# or
npm run dev
```
The application will open at `http://localhost:3000`

### Production Build
```bash
# Build for production
npm run build:prod

# Test production build locally
npm run serve
```

## 🌐 Deployment

This frontend-only application can be deployed to any static hosting service:

### Quick Deploy Options

1. **Netlify** (Recommended)
   - Connect your GitHub repo to Netlify
   - Set build command: `npm run build:prod`
   - Set publish directory: `dist`
   - Add environment variable: `REACT_APP_GROQ_API_KEY`

2. **Vercel**
   - Import your GitHub repo to Vercel
   - Set build command: `npm run build:prod`
   - Set output directory: `dist`
   - Add environment variable: `REACT_APP_GROQ_API_KEY`

3. **GitHub Pages**
   ```bash
   npm run build:prod
   # Upload dist/ folder contents to your GitHub Pages repo
   ```

4. **AWS S3 + CloudFront**
   - Build the app: `npm run build:prod`
   - Upload `dist/` folder contents to S3 bucket
   - Configure CloudFront for SPA routing

5. **Firebase Hosting**
   ```bash
   npm install -g firebase-tools
   firebase init hosting
   npm run build:prod
   firebase deploy
   ```

### Environment Variables for Deployment

Make sure to set the following environment variable in your hosting platform:
- `REACT_APP_GROQ_API_KEY`: Your Groq API key

## 🔧 Configuration

### API Key Setup
1. Get a free API key from [Groq Console](https://console.groq.com)
2. Add it to your environment variables:
   - Development: `env.local` file
   - Production: Your hosting platform's environment variables

### Customization
- **Candidate Information**: Edit `src/services/aiService.js` to update candidate details
- **Styling**: Modify CSS files in `src/components/` and `src/styles/`
- **AI Behavior**: Update the `SYSTEM_PROMPT` in `aiService.js`

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ChatApp.js      # Main app component
│   ├── ChatWindow.js   # Chat display component
│   ├── ChatInput.js    # Input component
│   └── ...
├── services/
│   └── aiService.js    # AI integration service
├── styles/             # Global styles
└── index.js           # App entry point
```

## 🎯 Key Benefits of Frontend-Only Approach

1. **Simpler Deployment**: No server configuration needed
2. **Cost Effective**: Only pay for static hosting (often free)
3. **Better Performance**: Direct API calls, no server latency
4. **Scalability**: CDN distribution handles traffic automatically
5. **Security**: API key is client-side (acceptable for public AI apps)

## 🚨 Important Notes

- **API Key Security**: The Groq API key is exposed in the frontend. This is acceptable for public AI applications but consider rate limiting and usage monitoring.
- **CORS**: Groq API supports CORS for frontend applications.
- **Rate Limits**: Monitor your Groq API usage to avoid exceeding limits.

## 🐛 Troubleshooting

### Common Issues

1. **API Key Not Working**
   - Verify your Groq API key is correct
   - Check environment variable is set properly
   - Ensure you have credits in your Groq account

2. **Build Errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check Node.js version (v14+ required)

3. **CORS Errors**
   - Groq API supports CORS, but if you encounter issues, check your browser's developer console

## 📞 Support

For issues related to:
- **Groq API**: Check [Groq Documentation](https://console.groq.com/docs)
- **React/Webpack**: Check the respective documentation
- **Deployment**: Check your hosting platform's documentation

## 🎉 Success!

Your Mchat application is now a pure frontend application that can be deployed anywhere! The deployment process is much simpler than before, and you can easily scale it using CDN services.
