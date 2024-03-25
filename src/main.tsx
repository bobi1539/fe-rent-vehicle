// import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import store from './store/reduxStore';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId="1059335129107-5gv3fqvl3vepil0pkbj3tbrk9s6rnobf.apps.googleusercontent.com">
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </GoogleOAuthProvider>,
  // </React.StrictMode>,
);
