import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const createPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  let navigate=useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/blogs', { title, content })
      .then((response) => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Error adding blog:', error);
        alert('Failed to add blog');
      });
  };
  

  return (
    <div>
      <h2>Add Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Blog</button>
      </form>
    </div>
  );
};

export default createPage;
