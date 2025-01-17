import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import { Button } from './Button';

function PostList({ blogs, refreshDashboard }) {
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);

  useEffect(() => {
    setFilteredBlogs(blogs);
  }, [blogs]);

  const handleSearch = (filteredData) => {
    setFilteredBlogs(filteredData);
    
    if (filteredData.length > 0) {
      const firstMatchedBlog = filteredData[0];
      const element = document.getElementById(firstMatchedBlog.uid);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleDelete = async (image) => {
    try {
      const response = await fetch(`http://localhost:5000/post/${image}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (response.ok) {
        refreshDashboard();
      } else {
        console.error('Failed to delete the blog post');
      }
    } catch (error) {
      console.error('Error deleting blog post:', error);
    }
  };

  return (
    <div className="flex flex-col container mx-auto p-4 max-w-3xl">
      <SearchBar data={blogs} onSearch={handleSearch}/>
      <h1 className="text-2xl font-bold mb-4 text-gray-800 flex justify-center">Blog List</h1>
      <div className="space-y-4">
        {filteredBlogs.length === 0 ? (
          <p className="text-center text-gray-500">No matching blogs found.</p>
        ) : (
          filteredBlogs.map((blog) => (
            <div
              key={blog.uid}
              id={blog.uid}
              className="flex flex-col md:flex-row items-center md:items-stretch bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
            >
              <img
                src={`http://localhost:5000/images/${blog.image}`}
                alt={blog.heading}
                className="h-40 w-full md:w-40 object-cover"
              />
              <div className="flex flex-col justify-center p-4 w-full">
                {/* <h2 className="text-xl font-semibold text-gray-800 truncate">
                  {blog.heading}
                </h2> */}
                <div className="max-w-full w-64 overflow-hidden">
                  <h2 className="text-xl font-semibold text-gray-800 truncate">
                    {blog.heading}
                  </h2>
                </div>
                <p className="text-gray-600 mt-2">
                  {new Date(blog.dateOfPublish).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div className="flex justify-end p-4 w-full">
                <Button onClick={() => handleDelete(blog.image)} className="bg-red-600 text-white hover:bg-red-700">
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PostList;