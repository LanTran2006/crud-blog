import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Blogs from "./Blogs";
import Pagination from "./Pagination";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page,setPage]=useState(1);
  let [totalPage,setTotalpage]=useState(0)
  useEffect(() => {
    let params = {
      limit: 3,
       page
    };
    setLoading(true)
    axios
      .get("http://localhost:5000/blogs", {
        params,
      })
      .then((response) => {
       setTotalpage(response.data.totalPages)
        setBlogs(response.data.blogs);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      });
  }, [page]);
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      axios
        .delete(`http://localhost:5000/blogs/${id}`)
        .then(() => {
          setBlogs(blogs.filter((blog) => blog.id !== id));
        })
        .catch((err) => {
          console.error("Error deleting blog:", err);
          alert("Failed to delete blog");
        });
    }
  };
  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Welcome to the Blog</h1>
      <p className="homepage-description">Your source for amazing articles.</p>

      {loading ? (
        <p className="loading-text">Loading blogs...</p>
      ) : (
        <div className="blogs-container">
          {blogs.length === 0 ? (
            <p className="no-blogs-text">
              No blogs available yet. add your own!
            </p>
          ) : (
            <Blogs blogs={blogs} handleDelete={handleDelete} />
          )}
        </div>
      )}
      <Pagination totalPage={totalPage} page={page} setPage={setPage} />
    </div>
  );
};

export default HomePage;
