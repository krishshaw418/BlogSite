import React from 'react'
import Header from '../components/Header';
import Graph from '../components/Graph';
import PostList from '../components/PostList';
import { useEffect, useState } from 'react';
function AdminDashboard() {
  const [blogs, setBlogs] = useState([{
    title:"",
    views:"",
    likes:""
  }]);

  // const [visits, setVisits] = useState([{
  //     date:"",
  //     visits:"",
  //   }
  // ])
  // ;

  useEffect(()=>{
    const getBlogData = async ()=>{
      try {
        const response = await fetch(`http://localhost:5000/posts`,{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
          },
        })
        if(!response.ok) throw new Error('Failed to fetch blogs');
        const data = await response.json();
        // setBlogs(data.map(blog => ({
        //   title: blog.heading,
        //   views: blog.views,
        //   likes: blog.likes
        // })));
        setBlogs(
          data
            .filter((blog) => {
              const todayMonth = new Date().getMonth(); // Current month (0-11)
              const blogMonth = new Date(blog.dateOfPublish).getMonth(); // Blog's month
              return todayMonth === blogMonth; // Include only if months match
            })
            .map((blog) => ({
              title: blog.heading, // Map the filtered blog to the desired format
              views: blog.views,
              likes: blog.likes,
            }))
        );
        
        // setVisits(data.map(blog => ({
        //   date: formattedDate,
        //   visits: 
        // })))
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    }
    getBlogData();
  });

  const blogData = {
    blogs: blogs
  }
    // const blogData = {
    //     visits: [
    //       { date: "Jan", visits: 200 },
    //       { date: "Feb", visits: 300 },
    //       { date: "Mar", visits: 250 },
    //     ],
    //     blogs: [
    //       { title: "Blog A", views: 120, likes: 30 },
    //       { title: "Blog B", views: 90, likes: 50 },
    //       { title: "Blog C", views: 150, likes: 40 },
    //     ],
    //   };
  return (
    <div>
        <Header></Header>
        <Graph data={blogData} />
        <PostList></PostList>
    </div>
  )
}

export default AdminDashboard