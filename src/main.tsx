import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Guard against third-party cross-origin script reporting errors
window.addEventListener('error', (event) => {
  if (
    event.message === 'Script error.' ||
    (typeof event.filename === 'string' && event.filename.includes('disqus')) ||
    !event.filename
  ) {
    // Suppress external cross-origin script error events
    return true;
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

