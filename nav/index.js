import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/style.scss'; // หรือ globals.css ถ้าใช้ Tailwind
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);