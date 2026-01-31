import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { LandRegistryProvider } from './context/LandRegistryContext'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LandRegistryProvider>
        <App />
      </LandRegistryProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
