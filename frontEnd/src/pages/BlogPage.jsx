import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import '../blogcss/BlogPage.css';
const BlogPage = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { uid } = useParams();
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const blogResponse = await fetch(`http://localhost:3000/post/${uid}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!blogResponse.ok) {
          throw new Error('Failed to fetch blog data');
        }
        const blogData = await blogResponse.json();
        setBlog(blogData.post);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, []);

  if (loading) {
    return <div className="text-center text-lg font-medium">Loading...</div>;
  }

  if (!blog) {
    return <div className="text-center text-lg text-red-500">Error loading blog content.</div>;
  }

  const { heading, author, dateOfPublish, content, image } = blog;

  // Format date
  const formattedDate = new Date(dateOfPublish).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div>
      <Header/>
      <h1 className="blog-title">{heading}</h1>
      <p className="blog-author  p-3"> By <span className='px-1 font-bold'>{author}</span> | Published on {formattedDate} </p>
      {image && (
        <img
          src={`http://localhost:3000/images/${image}`}
          alt={heading}
          className="blog-image"
        />
      )}
      <div className="text-white leading-relaxed text-base m-5 p-5" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default BlogPage;