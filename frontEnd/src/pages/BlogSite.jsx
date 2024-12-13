import React from 'react'
import Header from '../components/Header'
import Section1 from '../components/Section1'
import BlogList from '../pages/BlogList'
import Footer from '../components/Footer'
import Section2 from '../components/Section2'
import Section3 from '../components/Section3'
import ScrollToTopButton from '../components/ScrollToTopButton';

function BlogSite() {
  return (
    <div >
    <Header/>
    <Section1/>
    <BlogList/>
    <Section2/>
    <Section3/>
    <Footer/>
    <ScrollToTopButton/>
    </div>
  )
}

export default BlogSite
