import React, {useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
function Views({uid}) {
    const [views, setViews] = useState(0);
    useEffect(()=>{
        const fetchViews = async () => {
            try {
            const response = await fetch(`http://localhost:5000/post/${uid}`, {
                method: "GET",
            });
            if (!response.ok) throw new Error("Failed to fetch views");
            const data = await response.json();
            setViews(data.post.views);
            }
            catch (error) {
            console.error(error);
            }
        };
        fetchViews();
    },[uid]);
  return (
    <div className="flex items-center text-md">
      <FaEye className="mr-1 text-white" /> {/* Eye icon with margin */}
      <span className='text-white'>{views}</span> {/* Display the number of views */}
    </div>
  )
}

export default Views