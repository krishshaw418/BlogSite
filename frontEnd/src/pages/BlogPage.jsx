import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { stateToHTML } from 'draft-js-export-html';
import Header from '../components/Header';
import Views from '../components/Views';
import '../blogcss/BlogPage.css';
const BlogPage = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { uid } = useParams();
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const blogResponse = await fetch(`http://localhost:5000/post/${uid}`,{
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

  // const htmlContent = stateToHTML(content);

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
      <div >
      <h1 className="blog-title">{heading}</h1>
      <div className="blog-author gap-2 p-3 items-center">
      <p> By <span className='px-1 font-bold'>{author}</span> | Published on {formattedDate}</p>
      <Views uid={uid}/>
      </div>
      <div className="blog-container">
      {image && (
        <img
          src={`http://localhost:5000/images/${image}`}
          alt={heading}
          className='blog-image'
        />
      )}
      <div className="text-white leading-relaxed text-base m-5 p-5" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      </div>
    </div>
  );
};

export default BlogPage;