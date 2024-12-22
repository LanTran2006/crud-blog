import React from "react";
import { Link } from "react-router-dom";
function Blogs({ blogs, handleDelete }) {
  return (
    <ul className="blogs-list">
      {blogs.map((blog) => (
        <li key={blog.id} className="blog-item">
          <h2 className="blog-title">{blog.title}</h2>
          <p className="blog-content">{blog.content.substring(0, 100)}...</p>
          <div className="buttons">
            <button className="read-more">
              <Link to={`/blogs/${blog.id}`}>Read More</Link>
            </button>
            <button onClick={() => handleDelete(blog.id)} className="delete">
              Delete
            </button>
            <button className="edit">
              <Link
                to={`/blogs/${blog.id}/edit`}
                className="button edit-button"
              >
                Edit
              </Link>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Blogs;
