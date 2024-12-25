import React from 'react';
import { useNavigate } from 'react-router-dom';
import Likes from './Likes';

const BlogCard = ({uid, image, title, content, author, date }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${uid}`);
  };

  const truncatedContent = content.length > 150 ? `${content.substring(0, 150)}...` : content;

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
      <img
        className="w-full h-48 object-cover hover:cursor-pointer"
        src={`http://localhost:3000/images/${image}`}
        alt={title}
        onClick={handleClick}
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
        <div
          className="text-gray-600 text-sm mb-4"
          dangerouslySetInnerHTML={{ __html: truncatedContent }}
        />
        <div className="flex flex-row items-center justify-between text-sm text-gray-500">
          <Likes uid={uid} />
          <span>By: <span className="font-medium">{author}</span></span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
