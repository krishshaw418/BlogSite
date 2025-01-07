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
  
  const [post,setPosts] = useState([]);

  useEffect(()=>{
    const getBlogData = async ()=>{
      try {
        const response = await fetch(`http://localhost:5000/posts`,{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
          },
          credentials:'include',
        })
        if(!response.ok) throw new Error('Failed to fetch blogs');
        const data = await response.json();
        setPosts(data);
        setBlogs(
          data
            .filter((blog) => {
              const todayMonth = new Date().getMonth();
              const blogMonth = new Date(blog.dateOfPublish).getMonth();
              return todayMonth === blogMonth;
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
  },[]);

  const blogData = {
    blogs: blogs
  }
    // const blogData = {
    //     visits: [
    //       { date: "Jan", visits: 200 },
    //       { date: "Feb", visits: 300 },
    //       { date: "Mar", visits: 250 },
    //     ],
    //   };
  return (
    <div>
        <Header></Header>
        <Graph data={blogData} />
        <PostList blogs={post}></PostList>
    </div>
  )
}

export default AdminDashboard