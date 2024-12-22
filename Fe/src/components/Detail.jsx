import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/blogs/${id}`)
      .then((response) => {
        setBlog(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch blog details');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading blog details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="blog-details-container">
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <p><strong>Blog ID:</strong> {blog.id}</p>
    </div>
  );
};

export default Detail;
