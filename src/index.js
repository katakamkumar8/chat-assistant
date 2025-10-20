import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatApp from './components/ChatApp';
import './styles/App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChatApp />
  </React.StrictMode>
);
