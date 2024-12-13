import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

function Likes({uid}) {
    const [likes,setLikes] = useState(0);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const fetchLikes = async () => {
          try {
            const response = await fetch(`http://localhost:3000/post/${uid}`, {
              method: "GET",
            });
            if (!response.ok) throw new Error("Failed to fetch likes");
            const data = await response.json();
            setLikes(data.post.likes);
          }
          catch (error) {
            console.error(error);
          }
        };
    
        fetchLikes();
      }, [uid]);

      const handleLike = async () => {
        try {
          const response = await fetch(`http://localhost:3000/post/like/${uid}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              like: !liked,
            })
          });
          if (!response.ok) throw new Error("Failed to update likes");
          const data = await response.json();
          if(liked){
            setLikes(likes-1);
          }
          else{
            setLikes(likes+1);
          }
          setLiked(!liked);
        } catch (error) {
          console.error(error);
        }
      };
  return (
    <div className="flex flex-row gap-1 items-center justify-center">
      <button
  onClick={handleLike}
  className={`${liked ? "bg-white text-pink" : "text-pink-500"}`}
  aria-label="Like"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill={liked ? "currentColor" : "none"} 
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    />
  </svg>
</button>
      <p className="text-lg font-medium text-black">{likes}</p>
    </div>
  )
}

export default Likes