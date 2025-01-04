import React from 'react';
import { useNavigate } from 'react-router-dom';
import Likes from './Likes';
// import Views from './Views';

const BlogCard = ({uid, image, title, content, author, date }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const response = await fetch(`http://localhost:5000/post/view/${uid}`,{
        method: "PUT"
      })
      if(!response.ok) throw new Error("Failed to update views");
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
    navigate(`/blog/${uid}`);
  };

  const truncatedContent = content.length > 150 ? `${content.substring(0, 150)}...` : content;
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-[0_0_15px_4px_rgb(255,20,147)]">
      <img
        className="w-full h-48 object-cover hover:cursor-pointer border-b border-gray-300"
        src={`http://localhost:5000/images/${image}`}
        alt={title}
        onClick={handleClick}
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <div
          className="text-sm mb-4"
          dangerouslySetInnerHTML={{ __html: truncatedContent }}
        />
        <div className="flex flex-col sm:flex-row items-center sm:justify-between text-sm space-y-2 sm:space-y-0">
          <Likes uid={uid} />
          {/* <Views uid={uid}/> */}
          <span>By: <span className="font-medium">{author}</span></span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );  
};

export default BlogCard;