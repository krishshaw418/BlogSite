import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles

const TextEditor = () => {
  const [content, setContent] = useState('');
  const [heading, setHeading] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState(null);

  const handleContentChange = (value) => {
    setContent(value); // Update the editor content
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogData = {
      heading,
      author,
      content,
    };

    try {
      const response1 = await fetch('http://localhost:3000/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      const formData = new FormData();
      formData.append('image', image);

      const response2 = await fetch('http://localhost:3000/images', {
        method: 'POST',
        body: formData,
      });

      if (response1.ok && response2.ok) {
        const result1 = await response1.json();
        const result2 = await response2.json();
        alert('Blog post submitted successfully!');
        // Reset form
        setHeading('');
        setAuthor('');
        setContent('');
        setImage(null);
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
            Upload Image:
          </label>
          <input
            type="file"
            id="image"
            // value={image}
            onChange={(e) => handleFileChange(e)}
            className="w-full border px-3 py-2 rounded text-white"
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
