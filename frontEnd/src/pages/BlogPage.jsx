import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import '../blogcss/BlogPage.css';

function BlogPage() {
  const { uid } = useParams();
  const [blog, setBlog] = useState({});
  const [formattedDate, setFormattedDate] = useState('');

  // Function to format the date
  const formatDate = (isoDate) => {
    const d = new Date(isoDate);
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeek = daysOfWeek[d.getDay()];

    const day = d.getDate();
    const daySuffix = (day) => {
      if (day > 3 && day < 21) return `${day}th`; // for 4th to 20th, use 'th'
      switch (day % 10) {
        case 1:
          return `${day}st`;
        case 2:
          return `${day}nd`;
        case 3:
          return `${day}rd`;
        default:
          return `${day}th`;
      }
    };
    const dayWithSuffix = daySuffix(day);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[d.getMonth()];

    const year = d.getFullYear();

    return `${dayOfWeek}, ${dayWithSuffix} ${month}, ${year}`;
  };

  const getBlog = async () => {
    try {
      const response = await fetch(`http://localhost:3000/post/${uid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBlog(data.post);
        setFormattedDate(formatDate(data.post.dateOfPublish)); // Set the formatted date
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
    }
  };

  useEffect(() => {
    getBlog();
  }, [uid]);

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-6xl font-bold mb-4 text-white flex justify-center">{blog.heading}</h1>
        <div className="text-sm text-white flex justify-center mb-6">
          By <span className="font-medium text-white"> {blog.author} </span> | Published on {formattedDate}
        </div>
        {/* Author and Date */}
        <img
          src={`http://localhost:3000/images/${blog.image}`}
          alt={blog.heading}
          className="w-full h-auto rounded-lg shadow-md mb-6"
        />
        <p className="font-serif font-normal text-white text-lg leading-relaxed">{blog.content}</p>
      </div>
    </div>
  );
}

export default BlogPage;


// import React, {useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import Header from '../components/Header';
// import '../blogcss/BlogPage.css'

// function BlogPage() {
//   const { uid } = useParams();
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const [blog, setBlog] = React.useState({});
//   const [date, setDate] = useState('');
//   const getBlog = async () => {
//     try {
//       const response = await fetch(`http://localhost:3000/post/${uid}`,{
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//       if(response.ok){
//         const data = await response.json();
//         setBlog(data.post);
//         setDate(data.post.dateOfPublish);
//       }
//     } catch (error) {
//       console.error('Error fetching blog:', error);
//     }
//   }
//   useEffect(() => {
//     getBlog();
//   }, [uid]);

//   return (
//     <div>
//     <Header/>
//     <div className="max-w-4xl mx-auto p-6">
//     <h1 className="text-6xl font-bold mb-4 text-white flex justify-center">{blog.heading}</h1> 
//     <div className="text-sm text-white flex justify-center mb-6">
//     By <span className="font-medium text-white"> {blog.author} </span> | Published on {date}
//     </div> {/* Author and Date */}
//     <img
//     src={`http://localhost:3000/images/${blog.image}`}
//     alt={blog.heading}
//     className="w-full h-auto rounded-lg shadow-md mb-6"
//   />
//   <p className="font-serif font-normal text-white text-lg leading-relaxed">{blog.content}</p>
// </div>
//     </div>
//   );
// }

// export default BlogPage;