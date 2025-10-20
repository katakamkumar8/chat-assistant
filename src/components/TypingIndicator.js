import React from 'react';
import './TypingIndicator.css';

const TypingIndicator = ({ theme }) => {
  return (
    <div className={`typing-indicator ${theme}`}>
      <div className="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span className="typing-text">Mchat is typing...</span>
    </div>
  );
};

export default TypingIndicator;
