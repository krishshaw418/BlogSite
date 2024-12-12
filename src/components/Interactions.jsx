import React, { useState, useEffect } from "react";

const Interactions = ({ initialViews = 0, initialLikes = 0, incrementViews = false }) => {
  const [views, setViews] = useState(initialViews);
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  // Increment views when the blog page is opened
  useEffect(() => {
    if (incrementViews) {
      setViews((prevViews) => prevViews + 1);
    }
  }, [incrementViews]);

  // Toggle like functionality
  const handleLike = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
    setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
  };

  return (
    <div className="flex items-center space-x-4 text-gray-600">
      {/* Views */}
      <div className="flex items-center space-x-2">
        <span className="material-icons text-lg">visibility</span>
        <span>{views} views</span>
      </div>

      {/* Likes */}
      <button
        className="flex items-center space-x-2 focus:outline-none"
        onClick={handleLike}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={isLiked ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={`w-5 h-5 ${isLiked ? "text-red-500" : "text-gray-500"}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11.049 2.927c.3-1.197 1.952-1.197 2.252 0a5.478 5.478 0 011.212 4.216 5.478 5.478 0 01-.633 2.487l-2.831 4.731a.75.75 0 01-1.246 0L6.972 9.63a5.478 5.478 0 01-.633-2.487 5.478 5.478 0 011.212-4.216c.3-1.197 1.952-1.197 2.252 0a5.478 5.478 0 011.246 4.478 5.478 5.478 0 01-.972-3.476z"
          />
        </svg>
        <span>{likes}</span>
      </button>
    </div>
  );
};

export default Interactions;
