import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TextEditor from './components/TextEditor';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<TextEditor/>}></Route>
      </Routes>
    </Router>
  )
}

export default App