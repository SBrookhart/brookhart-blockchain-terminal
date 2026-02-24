import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add preload class to prevent transitions on load
document.body.classList.add('preload');

// Remove preload class after a short delay
setTimeout(() => {
  document.body.classList.remove('preload');
}, 100);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
