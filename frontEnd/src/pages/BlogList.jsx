import React, { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';

function BlogList() {

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/posts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json(); 
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);
  
  //date formatting
  const formatDate = (isoDate) => {
    const d = new Date(isoDate);
  
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeek = daysOfWeek[d.getDay()];
  
    const day = d.getDate();
    const daySuffix = (day) => {
      if (day > 3 && day < 21) return `${day}th`;
      switch (day % 10) {
        case 1:
          return `${day}st`;
        case 2:
          return `${day}nd`;
        case 3:
          return `${day}rd`;
        default:
          return `${day}th`;
      }
    };
    const dayWithSuffix = daySuffix(day);
  
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[d.getMonth()];
  
    const year = d.getFullYear();
  
    return `${dayOfWeek}, ${dayWithSuffix} ${month}, ${year}`;
  };
  

  return (
    <div id='blogs' className="px-4 sm:px-6 lg:px-8">
      <div className='flex justify-center gap-3'>
      <h1 className='text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-6'>Our</h1>
      <h1 className='text-pink-500 text-4xl sm:text-5xl md:text-6xl font-bold mb-6'>Blogs</h1>
      </div>
      <div className="container mx-auto p-4 grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.uid}
          uid={blog.uid}
          image={blog.image}
          title={blog.heading}
          content={blog.content}
          author={blog.author}
          date={formatDate(blog.dateOfPublish)}
        />
      ))}
      </div>
    </div>
  )
}

export default BlogList