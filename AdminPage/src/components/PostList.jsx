import React from 'react';

function PostList({ blogs }) {
  return (
    <div className="flex flex-col container mx-auto p-4  max-w-3xl">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 flex justify-center">Blog List</h1>
      <div className="space-y-4">
        {blogs.map((blog) => (
          <div
            key={blog.uid}
            className="flex flex-col md:flex-row items-center md:items-stretch bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
          >
            <img
              src={`http://localhost:5000/images/${blog.image}`}
              alt={blog.heading}
              className="h-40 w-full md:w-40 object-cover"
            />
            <div className="flex flex-col justify-center p-4 w-full">
              <h2 className="text-xl font-semibold text-gray-800 truncate">
                {blog.heading}
              </h2>
              <p className="text-gray-600 mt-2">{new Date(blog.dateOfPublish).toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
              })}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostList;