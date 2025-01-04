import React from 'react'
import Header from '../components/Header';
import Graph from '../components/Graph';
import PostList from '../components/PostList';
function AdminDashboard() {
    const blogData = {
        visits: [
          { date: "Jan", visits: 200 },
          { date: "Feb", visits: 300 },
          { date: "Mar", visits: 250 },
        ],
        blogs: [
          { title: "Blog A", views: 120, likes: 30 },
          { title: "Blog B", views: 90, likes: 50 },
          { title: "Blog C", views: 150, likes: 40 },
        ],
      };
  return (
    <div>
        <Header></Header>
        <Graph data={blogData} />
        <PostList></PostList>
    </div>
  )
}

export default AdminDashboard