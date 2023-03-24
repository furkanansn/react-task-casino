import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { AuthContextProvider } from './store/auth-context';
import {BrowserRouter as Router}  from "react-router-dom";

import {
  AppProvider, 
} from '@shopify/polaris';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AppProvider>
    <AuthContextProvider>
    <Router>
    <App />
    </Router>
  </AuthContextProvider>
  </AppProvider>
);