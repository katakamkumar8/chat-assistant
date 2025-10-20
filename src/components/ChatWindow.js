import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import './ChatWindow.css';

const ChatWindow = ({ messages, isLoading, theme, onSuggestedQuestion }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className={`chat-window ${theme}`}>
      <div className="messages-container">
        {messages.length === 0 && (
          <div className="welcome-message">
            <div className="welcome-content">
              <h2>Welcome to Mchat</h2>
              <p>I'm here to help you learn about Mallesh's professional background, skills, and experience.</p>
              <div className="suggested-questions">
                <p>Try asking:</p>
                <ul>
                  <li 
                    className="suggested-question"
                    onClick={() => onSuggestedQuestion("What are Mallesh's technical skills?")}
                  >
                    What are Mallesh's technical skills?
                  </li>
                  <li 
                    className="suggested-question"
                    onClick={() => onSuggestedQuestion("Tell me about his projects")}
                  >
                    Tell me about his projects
                  </li>
                  <li 
                    className="suggested-question"
                    onClick={() => onSuggestedQuestion("What is his work experience?")}
                  >
                    What is his work experience?
                  </li>
                  <li 
                    className="suggested-question"
                    onClick={() => onSuggestedQuestion("What certifications does he have?")}
                  >
                    What certifications does he have?
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {messages.map((message) => (
          <MessageBubble 
            key={message.id} 
            message={message} 
            theme={theme}
          />
        ))}
        
        {isLoading && <TypingIndicator theme={theme} />}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
