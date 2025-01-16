import React, { useState, useRef } from 'react';
import { Editor, EditorState, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import 'draft-js/dist/Draft.css';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../blogcss/BlogPage.css';

const TextEditor = () => {
  // const userId = useParams();
  const editorRef = useRef(null);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [heading, setHeading] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handlePreview = () => {
    setPreview(true);
  };

  const handleClosePreview = () => {
    setPreview(false);
  };

  const formattedDate = new Date(Date.now()).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (loading) return;
    setLoading(true);
  
    try {
      if (!image) {
        throw new Error('Image is required');
      }
  
      const formData = new FormData();
      formData.append('image', image);
  
      // Send the image to the server
      const response2 = await fetch(`http://localhost:5000/admin/images`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
  
      if (response2.ok) {
        const result2 = await response2.json();
        const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        const blogData = {
          // userId: userId,
          heading,
          author,
          content,
          image: result2.key,
        };
  
        const response1 = await fetch(`http://localhost:5000/admin/post`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(blogData),
          credentials: 'include',
        });
  
        if (response1.ok) {
          alert('Blog post submitted successfully!');
          setHeading('');
          setAuthor('');
          setEditorState(EditorState.createEmpty());
          setImage(null);
        } else {
          throw new Error('Failed to submit the blog post');
        }
      } else {
        throw new Error('Failed to upload the image');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting the blog post. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const focusEditor = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const contentState = editorState.getCurrentContent();
  const htmlContent = stateToHTML(contentState);

  return (
  <div>
    <Header></Header>
    <div className="bg-gray-200 min-h-screen p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
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
              onChange={handleFileChange}
              className="w-full border px-3 py-2 rounded text-black"
              accept="image/*"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Blog Content:</label>
            <div
              onClick={focusEditor}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                minHeight: '200px',
                cursor: 'text',
              }}
            >
              <Editor
                ref={editorRef}
                editorState={editorState}
                onChange={handleEditorChange}
              />
            </div>
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
                loading
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white`}
            >
              Upload
            </button>
          </div>
        </form>
      </div>

      {preview && (
        <div
          className={`fixed top-0 right-0 h-full w-full bg-gray-900 bg-opacity-75 z-50 flex justify-center items-center`}
        >
          <div className="bg-[rgb(2,6,34)] w-3/4 h-3/4 overflow-auto rounded-lg shadow-lg relative p-6">
            <button
              onClick={handleClosePreview}
              className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
            >
              X
            </button>
            <div className="h-full overflow-auto">
              <div className="p-4 text-white flex flex-col items-center">
                <h1 className="text-4xl font-bold mb-4">{heading}</h1>
                <p className="mb-4">
                  By <span className="font-semibold">{author}</span> | Published on {formattedDate}
                </p>
                {image && (
                  <img
                    src={URL.createObjectURL(image)}
                    alt={heading}
                    className="mb-4 w-80 h-auto rounded"
                  />
                )}
                <div className="max-w-3xl w-full leading-relaxed">
                    <div
                      className="w-full"
                      dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
  );
};

export default TextEditor;