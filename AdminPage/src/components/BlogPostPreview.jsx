import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const BlogPostPreview = () => {
  const { state: blogData } = useLocation();

  if (!blogData) {
    return <p>No data to preview.</p>;
  }

  // Format date
  const formattedDate = new Date(Date.now()).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 border rounded shadow text-white">
        <div className='flex flex-col items-center'>
        <h1 className="text-3xl font-bold mb-4 text-white">{blogData.heading}</h1>
        <p className="blog-author  p-3"> By <span className='px-1 font-bold'>{blogData.author}</span> | Published on {formattedDate} </p>
        {blogData.image && <img src={blogData.image} alt="Blog" className="mb-4" />}
        </div>
        <div className="text-white leading-relaxed text-base m-5 p-5" dangerouslySetInnerHTML={{ __html: blogData.content }} />
    </div>
  );
};

export default BlogPostPreview;