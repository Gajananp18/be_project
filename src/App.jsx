import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SignUp from './SignUp';
import Login from './Login';
import HomePage from './HomePage';
import Uploader from './Uploader';
import AboutUs from './AboutUs';
import NavBar from './NavBar';
import Dashboard from './Dashboard';
import SendOtpPage from './SendOtpPage';
import VerifyOtpPage from './VerifyOtpPage';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Uploader" element={<Uploader />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/SendOtpPage" element={<SendOtpPage />} /> 
        <Route path="/verifyOtp" element={<VerifyOtpPage />} />

      </Routes>
    </Router>
  );
}

export default App
