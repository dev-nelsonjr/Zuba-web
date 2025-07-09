import * as React from 'react';
import ReactDOM from 'react-dom/client';

import { Theme } from './components/Theme'
import { AuthProvider } from './components/Modules'

import reportWebVitals from './reportWebVitals';
import { App } from './pages';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Theme>
      <AuthProvider>
         <App />
      </AuthProvider>
    </Theme>
  </React.StrictMode>,
);

reportWebVitals();
