import * as React from 'react';
import ReactDOM from 'react-dom';

import { Theme } from './components/Theme'
import { AuthProvider } from './components/Modules'

import reportWebVitals from './reportWebVitals';
import { App } from './pages';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Theme>
      <AuthProvider>
         <App />
      </AuthProvider>
    </Theme>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
