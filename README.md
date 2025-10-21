# 🤖 Mchat - AI-Powered Candidate Information Chatbot

A modern, ChatGPT-style interface for showcasing candidate information through an intelligent AI chatbot. Built with React.js and powered by Groq AI API, this application provides an interactive way for recruiters to learn about Mallesh's skills, experience, and qualifications.

## ✨ Features

- 🎯 **AI-Powered Chat**: Direct integration with Groq AI API for intelligent responses
- 🎨 **Modern UI/UX**: ChatGPT-style interface with smooth animations
- 🌙 **Theme Support**: Dark and light mode toggle with persistent preferences
- 🎤 **Voice Input**: Speech-to-text support for hands-free interaction
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- 💬 **Conversation History**: Maintains context throughout the chat session
- 🚀 **No Backend Required**: Pure frontend application with direct API integration
- 🔄 **Multi-Model Support**: Automatic fallback between different AI models

## 🛠️ Tech Stack

- **Frontend**: React.js 18.2.0
- **Build Tool**: Webpack 5
- **AI Integration**: Groq API (Llama, Mistral models)
- **Styling**: CSS3 with modern features
- **Development**: Babel, ESLint, Hot Module Replacement

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Groq API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MCHAT
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp env.example .env
   
   # Add your Groq API key to .env
   REACT_APP_GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Start the development server**
   ```bash
   # Using the provided script (Windows)
   start_dev.bat
   
   # Using the provided script (Linux/Mac)
   chmod +x start_dev.sh
   ./start_dev.sh
   
   # Or manually
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 Usage

### For Recruiters
Ask questions about Mallesh's:
- **Technical Skills**: "What programming languages does Mallesh know?"
- **Work Experience**: "Tell me about his current role at Better Analytics"
- **Projects**: "What projects has he worked on?"
- **Education**: "What is his educational background?"
- **Certifications**: "What certifications does he have?"

### For Developers
- **Theme Toggle**: Switch between dark and light modes
- **Voice Input**: Click the microphone to speak your questions
- **Clear Chat**: Reset the conversation anytime
- **Responsive Design**: Works on all device sizes

## 🏗️ Project Structure

```
MCHAT/
├── src/
│   ├── components/          # React components
│   │   ├── ChatApp.js       # Main application component
│   │   ├── ChatWindow.js    # Chat display component
│   │   ├── ChatInput.js     # Input handling component
│   │   ├── MessageBubble.js # Individual message component
│   │   ├── ThemeToggle.js   # Theme switching component
│   │   └── TypingIndicator.js # Loading animation
│   ├── services/
│   │   └── aiService.js     # Groq API integration
│   ├── styles/
│   │   └── App.css          # Global styles
│   └── index.js             # Application entry point
├── public/
│   └── index.html           # HTML template
├── dist/                    # Production build output
├── package.json             # Dependencies and scripts
├── webpack.config.js        # Webpack configuration
└── README.md               # This file
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_GROQ_API_KEY=your_groq_api_key_here
```

### API Configuration
The application uses multiple AI models with automatic fallback:
- **Primary**: `llama-3.3-70b-versatile` (Most capable)
- **Secondary**: `mistral-saba-24b` (Multilingual support)
- **Fallback**: `llama-3.1-8b-instant` (Fastest response)

## 📦 Available Scripts

```bash
# Development
npm start          # Start development server
npm run dev        # Start with auto-open browser

# Production
npm run build      # Build for production
npm run build:prod # Production build with environment
npm run serve      # Serve production build locally

# Deployment
npm run deploy     # Build for GitHub Pages
```

## 🚀 Deployment

### GitHub Pages
```bash
npm run deploy
# Deploy the dist/ folder to GitHub Pages
```

### Netlify
```bash
npm run build:prod
# Upload dist/ folder to Netlify
```

### Vercel
```bash
npm run build:prod
# Connect your GitHub repository to Vercel
```

## 🎨 Customization

### Styling
- Modify CSS files in `src/components/` for component-specific styles
- Update `src/styles/App.css` for global styles
- Theme colors are defined in CSS custom properties

### AI Responses
- Edit the system prompt in `src/services/aiService.js`
- Modify candidate information in the `SYSTEM_PROMPT` constant
- Adjust response parameters (temperature, max_tokens)

### Components
- Add new React components in `src/components/`
- Import and use in `ChatApp.js`
- Follow the existing component structure

## 🧪 Testing

### Manual Testing
1. **Theme Toggle**: Switch between dark/light modes
2. **Voice Input**: Test microphone functionality
3. **Chat Flow**: Send messages and verify responses
4. **Responsive Design**: Test on different screen sizes
5. **Error Handling**: Test with invalid API keys

### Test Questions
Try these sample questions:
- "What are Mallesh's technical skills?"
- "Tell me about his work experience"
- "What projects has he completed?"
- "What is his educational background?"

## 🔍 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

**API Key Issues**
- Ensure `REACT_APP_GROQ_API_KEY` is set in `.env`
- Verify the API key is valid and has sufficient credits
- Check browser console for error messages

**Build Issues**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📊 Performance

- **Bundle Size**: Optimized with Webpack code splitting
- **Loading Time**: Fast initial load with lazy loading
- **API Response**: Multi-model fallback for reliability
- **Memory Usage**: Efficient conversation history management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mallesh Kumar Katakam**
- 📧 Email: katakamkumar8@gmail.com
- 📞 Phone: +91 9550804954
- 💼 LinkedIn: [Mallesh Kumar Katakam](https://www.linkedin.com/in/mallesh-kumar-katakam-3490871a0/)

## 🙏 Acknowledgments

- Groq AI for providing the AI API
- React.js community for the excellent framework
- All contributors and testers

---

**Made by Mallesh Kumar Katakam**
