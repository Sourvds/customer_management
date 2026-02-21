import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import './styles/global.css';

function App() {
  useEffect(() => {
    // Set theme from localStorage on mount
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  return (
    <>
      <HomePage />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: '8px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
            backdropFilter: 'blur(10px)',
          },
        }}
      />
    </>
  );
}

export default App;
