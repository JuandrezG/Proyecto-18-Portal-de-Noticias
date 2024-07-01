
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { NewsApi } from './api/NewsApi.js'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <ApiProvider api={NewsApi}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ApiProvider>
  </Router>,
)

