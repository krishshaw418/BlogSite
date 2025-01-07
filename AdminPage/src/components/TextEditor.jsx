import React, { useState } from 'react';
import ReactQuill from 'react-quill';
// require('dotenv').config();
import '../blogcss/BlogPage.css';
import 'react-quill/dist/quill.snow.css';

// const port = process.env.REACT_APP_PORT;
const TextEditor = () => {
  const [content, setContent] = useState('');
  const [heading, setHeading] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [window, setWindow] = useState(false);

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handlePreview = ()=>{
    setWindow(true);
  }

  const handleClosePreview = () => {
    setWindow(false);
  }

  const formattedDate = new Date(Date.now()).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // Prevent duplicate submissions
    setLoading(true); // Set loading to true when submission starts

    try {
      const formData = new FormData();
      formData.append('image', image);

      const response2 = await fetch(`http://localhost:5000/images`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if(response2.ok){
        const result2 = await response2.json();
        const blogData = {
          heading,
          author,
          content,
          image:result2.key
        };
        const response1 = await fetch(`http://localhost:5000/post`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(blogData),
          credentials:'include',
        });

        if(response1.ok){
          const result1 = await response1.json();
          alert('Blog post submitted successfully!');
          setHeading('');
          setAuthor('');
          setContent('');
          setImage(null);
        }
      }
      else{
        throw new Error('Failed to submit the blog post');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting the blog post. Please try again.');
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen p-8">
     <div className= "max-w-2xl mx-auto bg-white p-6 rounded shadow">
     <h1 className="text-2xl font-bold mb-4">Create a Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4 text-black">
        <div>
          <label htmlFor="title" className="block font-semibold mb-1">
            Blog Title:
          </label>
          <input
            type="text"
            id="heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="w-full border px-3 py-2 rounded text-black"
            placeholder="Enter blog title"
            required
          />
        </div>

        <div>
          <label htmlFor="author" className="block font-semibold mb-1">
            Author Name:
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full border px-3 py-2 rounded text-black"
            placeholder="Enter author name"
            required
          />
        </div>

        <div>
          <label htmlFor="image" className="block font-semibold mb-1">
            Upload Image:
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => handleFileChange(e)}
            className="w-full border px-3 py-2 rounded text-black"
            accept="image/*"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Blog Content:</label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleContentChange}
            placeholder="Write your blog content here..."
          />
        </div>
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={handlePreview}
            className="py-2 px-4 rounded bg-green-500 hover:bg-green-600 text-white"
          >
            Preview
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`py-2 px-4 rounded ${
              loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            Upload
          </button>
        </div>
      </form>
     </div>

     <div
        className={`fixed top-0 right-0 h-full transform transition-transform duration-300 ${
          window ? 'translate-x-0' : 'translate-x-full'
        } w-1/2 preview-window p-4`}
      >
        <button
          onClick={handleClosePreview}
          className="absolute top-4 right-4 text-white"
        >
          X
        </button>
        <div className="h-full overflow-auto">
          <div className="p-4">
            <h1 className="blog-title">{heading}</h1>
            <p className="blog-author  p-3"> By <span className='px-1 font-bold'>{author}</span> | Published on {formattedDate} </p>
            <div className='blog-container'>
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt={heading}
                className="blog-image"
              />
            )}
            <div className="text-white leading-relaxed text-base m-5 p-5" dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </div>
        </div>
      </div>
     </div>
  );
};

export default TextEditor;