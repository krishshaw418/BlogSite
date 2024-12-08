import React from 'react'
import Header from '../components/Header'
import Intro from '../components/Intro'
import BlogList from '../pages/BlogList'
import Footer from '../components/Footer'
import About from '../components/About'
import Contact from '../components/Contact'
import ScrollToTopButton from '../components/ScrollToTopButton';

function App() {
  return (
    <div >
    <Header/>
    <Intro/>
    <BlogList/>
    <About/>
    <Contact/>
    <Footer/>
    <ScrollToTopButton/>
    </div>
  )
}

export default App
