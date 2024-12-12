import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({id, image, title, content, author, date }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${id}`);
  };

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:cursor-pointer" onClick={handleClick}>
      <img
        className="w-full h-48 object-cover"
        src={image}
        alt={title}
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 text-sm mb-4">
          {content.length > 100 ? `${content.substring(0, 100)}...` : content}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>By: <span className="font-medium">{author}</span></span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
