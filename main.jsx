import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Registro del Service Worker para funcionamiento Offline 100%
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Sovereign Protocol: Offline Ready', reg))
      .catch(err => console.log('Sovereign Protocol: Failure', err));
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
