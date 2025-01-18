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
  
  const [post,setPosts] = useState([]);

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
        
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    }
    getBlogData();
  },[]);

  // const getUser = async ()=> {
  //   const response = await fetch(`http://localhost:5000/user`);
  //     if(!response.ok){
  //       throw new Error('Failed to fetch user data');
  //   }
  //   const data = await response.json();
  //   setUser(data.name);
  // }

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
  };

  const blogData = {
    blogs: blogs
  }
// if(blogs != [{
//   title:"",
//   views:"",
//   likes:""
// }]){
//   return (
//     <div>
//       <Header></Header>
//       <div>
//         <Button onClick = {()=>{
//           navigate(`/admin/editor`);
//         }}>Get Started</Button>
//       </div>
//     </div>
//   )
// }
  return (
    <div>
        <Header></Header>
        <Graph data={blogData} />
        <PostList blogs={post} refreshDashboard={refreshDashboard}></PostList>
    </div>
  )
}

export default AdminDashboard