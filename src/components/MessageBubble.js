import React, { useState } from 'react';
import './MessageBubble.css';

const MessageBubble = ({ message, theme }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`message-bubble ${message.type} ${theme} ${message.isError ? 'error' : ''}`}>
      <div className="message-content">
        <div className="message-text">
          {message.content}
        </div>
        <div className="message-actions">
          <span className="message-time">
            {formatTime(message.timestamp)}
          </span>
          {message.type === 'bot' && (
            <button 
              className="copy-btn"
              onClick={copyToClipboard}
              title={isCopied ? 'Copied!' : 'Copy message'}
            >
              {isCopied ? '✓' : '📋'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
