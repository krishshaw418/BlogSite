import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './pages/Admin';
import SignUp from './pages/SignUp';
import AdminDashboard from './pages/AdminDashboard';
// import BlogPostPreview from './components/BlogPostPreview';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignUp/>}></Route>
        <Route path='/admin/editor' element={<Admin/>}></Route>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}></Route>
      </Routes>
    </Router>
  )
}
export default App