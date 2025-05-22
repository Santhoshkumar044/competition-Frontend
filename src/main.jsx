// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import HomePage from './pages/HomePage.jsx'
import CITLoginPage from './pages/CITLoginPage.jsx'
import './index.css'
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard.jsx"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <BrowserRouter>
      <Routes>
       {/**  <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<CITLoginPage />} />*/}
        
        <Route path="/" element={<UserDashboard />}  />
       {/*} <Route path="/" element={<AdminDashboard />} />*/}

      </Routes>
    </BrowserRouter> 

  </React.StrictMode>,
)
