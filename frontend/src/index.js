import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvider } from './context/CartContext'; // 🆕
import { CompareProvider } from './context/CompareContext';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider>
      <CompareProvider>
      <App />
      <Toaster position="top-center" reverseOrder={false} />
      </CompareProvider>
    </CartProvider>
  </React.StrictMode>
);
