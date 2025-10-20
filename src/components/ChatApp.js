import React, { useState, useEffect } from 'react';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import ThemeToggle from './ThemeToggle';
import aiService from '../services/aiService';
import './ChatApp.css';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [userId] = useState(() => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('mchat-theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('mchat-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleSuggestedQuestion = (question) => {
    sendMessage(question);
  };

  const sendMessage = async (messageText) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const data = await aiService.sendMessage(userId, messageText);

      if (data.status === 'success') {
        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          content: data.response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = async () => {
    try {
      aiService.resetConversation(userId);
      setMessages([]);
    } catch (error) {
      console.error('Error clearing chat:', error);
    }
  };

  return (
    <div className={`chat-app ${theme}`}>
      <div className="chat-header">
        <div className="header-content">
          <div className="header-left">
            <h1>Mchat</h1>
            <div className="contact-info">
              <a 
                href="https://www.linkedin.com/in/mallesh-kumar-katakam-3490871a0/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-link linkedin"
                title="Visit LinkedIn Profile"
              >
                💼 LinkedIn
              </a>
              <a 
                href="tel:+919550804954" 
                className="contact-link phone"
                title="Call +91 9550804954"
              >
                📞 Contact
              </a>
              <a 
                href="mailto:katakamkumar8@gmail.com" 
                className="contact-link email"
                title="Send email to katakamkumar8@gmail.com"
              >
                ✉️ Mail
              </a>
            </div>
          </div>
          <div className="header-controls">
            <button 
              className="clear-btn" 
              onClick={clearChat}
              title="Clear conversation"
            >
              🗑️
            </button>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </div>
      </div>
      
      <ChatWindow 
        messages={messages} 
        isLoading={isLoading}
        theme={theme}
        onSuggestedQuestion={handleSuggestedQuestion}
      />
      
      <ChatInput 
        onSendMessage={sendMessage}
        isLoading={isLoading}
        theme={theme}
      />
    </div>
  );
};

export default ChatApp;
