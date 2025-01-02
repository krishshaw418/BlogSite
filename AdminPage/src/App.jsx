import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './pages/Admin';
// import BlogPostPreview from './components/BlogPostPreview';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Admin/>}></Route>
        {/* <Route path='/preview' element={<BlogPostPreview/>}></Route> */}
      </Routes>
    </Router>
  )
}
export default App