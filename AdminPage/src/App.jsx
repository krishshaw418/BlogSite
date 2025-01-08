import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Admin from './pages/Admin';
import TextEditor from './pages/TextEditor';
import SignUp from './pages/SignUp';
import AdminDashboard from './pages/AdminDashboard';
import SignIn from './pages/SignIn';
import PrivateRoute from './components/PrivateRoute';
// import BlogPostPreview from './components/BlogPostPreview';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignUp/>}></Route>
        <Route path='/signIn' element={<SignIn/>}></Route>
        <Route path='/admin/editor' element={<PrivateRoute><TextEditor/></PrivateRoute>}></Route>
        <Route path='/admin/dashboard' element={<PrivateRoute><AdminDashboard/></PrivateRoute>}></Route>
      </Routes>
    </Router>
  )
}
export default App