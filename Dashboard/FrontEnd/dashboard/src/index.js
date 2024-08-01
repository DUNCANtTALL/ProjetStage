import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import your root component
import './index.css'; // Import global styles (optional)

const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
