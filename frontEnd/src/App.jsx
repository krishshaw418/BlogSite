import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogSite from './pages/BlogSite'
import BlogPage from './pages/BlogPage';
import './App.css'

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<BlogSite/>} />
      <Route path="/blog/:id" element={<BlogPage />} />
    </Routes>
  </Router>
  )
}

export default App
