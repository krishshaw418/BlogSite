import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

function Likes() {
    const {id} = useParams();
    const [likes,setLikes] = useState(0);
    useEffect(() => {
        const fetchLikes = async () => {
          try {
            const response = await fetch(`http://localhost:3000/likes/${id}`, {
              method: "GET",
            });
            if (!response.ok) throw new Error("Failed to fetch likes");
            const data = await response.json();
            setLikes(data.likes); // Assume the API returns { likes: <number> }
          }
          catch (error) {
            console.error(error);
          }
        };
    
        fetchLikes();
      }, [id]);

      const handleLike = async () => {
        try {
          const response = await fetch(`http://localhost:3000/liked/${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) throw new Error("Failed to update likes");
          const data = await response.json();
          setLikes(data.likes);
        } catch (error) {
          console.error(error);
        }
      };
  return (
    <div>
        <button onClick={handleLike}>Like</button>
        <p>{likes}</p>
    </div>
  )
}

export default Likes