import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles

const TextEditor = () => {
  const [content, setContent] = useState('');
  const [heading, setHeading] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');

  const handleContentChange = (value) => {
    setContent(value); // Update the editor content
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogData = {
      heading,
      author,
      image,
      content,
    };

    try {
      const response = await fetch('http://localhost:3000/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Blog post submitted successfully!');
        // Reset form
        setHeading('');
        setAuthor('');
        setImage('');
        setContent('');
      } else {
        throw new Error('Failed to submit the blog post');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting the blog post. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 border rounded shadow text-white">
      <h1 className="text-2xl font-bold mb-4">Create a Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            Image URL:
          </label>
          <input
            type="url"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border px-3 py-2 rounded text-black"
            placeholder="Enter image url"
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

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default TextEditor;
