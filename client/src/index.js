import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { ClerkProvider } from '@clerk/clerk-react'



const PUBLISHABLE_KEY = "pk_test_ZmluZS1jYXJpYm91LTM1LmNsZXJrLmFjY291bnRzLmRldiQ";

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClerkProvider
  publishableKey={PUBLISHABLE_KEY}
  appearance={{
    layout: {
      socialButtonsPlacement: 'bottom',
      socialButtonsVariant: 'iconButton',
      termsPageUrl: 'https://clerk.com/terms'
    }
    }}>
      <App />      
    </ClerkProvider>
  </React.StrictMode>
);