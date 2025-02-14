import React from 'react'
import Header from '../components/Header';
import Graph from '../components/Graph';
import PostList from '../components/PostList';
import { Button } from '../components/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function AdminDashboard() {
  const [blogs, setBlogs] = useState([{
    title:"",
    views:"",
    likes:""
  }]);
  
  const [post,setPost] = useState([]);

  const [user, setUser] = useState("");
  const navigate = useNavigate();
  useEffect(()=>{
    const getBlogData = async ()=>{
      try {
        const response = await fetch(`http://localhost:5000/admin/posts`,{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
          },
          credentials:'include',
        })
        if(!response.ok) throw new Error('Failed to fetch blogs');
        const data = await response.json();
        if(data.length === 0){
          setPost([]);
          setBlogs([]);
          return;
        }

        setPost(data);
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
        
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    }
    getBlogData();
  },[]);

  const refreshDashboard = async () => {
    // Refetch the blogs after a post is deleted
    const response = await fetch('http://localhost:5000/admin/posts',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
      },
      credentials:'include',
    });
    if(!response.ok) throw new Error('Failed to reload blogs');
    const data = await response.json();
    setPost(data);
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
  };

  const blogData = {
    blogs: blogs
  }

  return (
    <div>
        <Header></Header>
        {post.length===0?(
          <div className='min-h-screen flex flex-col justify-center items-center'>
            <p><span className='text-2xl'>No blogs yet?</span> <Button onClick={() => navigate(`/admin/editor`)}>Get Started</Button> <span className='text-2xl'>by writring your first blog.</span></p>
          </div>
        ):(
          <>
            <Graph data={blogData} />
            <PostList blogs={post} refreshDashboard={refreshDashboard}></PostList>
          </>
        )}
    </div>
  )
}

export default AdminDashboard