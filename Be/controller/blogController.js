const blogService = require("../service/blog.js");
//search and paginate
exports.getAllBlogs = (req, res) => {
  let blogs = blogService.getAllBlogs();
  let { page = 2, limit, search = "" } = req.query;
  blogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(search) ||
      blog.content.toLowerCase().includes(search)
  );
  limit = parseInt(limit);
  page = parseInt(page);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedBlogs = blogs.slice(startIndex, endIndex);
  res.json({
    totalPages: Math.ceil(blogs.length / limit),
    blogs: paginatedBlogs,
  });
};

exports.getBlogById = (req, res) => {
  const blog = blogService.getBlogById(req.params.id);
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }
  res.json(blog);
};

exports.createBlog = (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  const newBlog = blogService.createBlog({ title, content });
  res.status(201).json(newBlog);
};

exports.updateBlog = (req, res) => {
  const updatedBlog = blogService.updateBlog(req.params.id, req.body);
  if (!updatedBlog) {
    return res.status(404).json({ error: "Blog not found" });
  }
  res.json(updatedBlog);
};

exports.deleteBlog = (req, res) => {
  const success = blogService.deleteBlog(req.params.id);
  if (!success) {
    return res.status(404).json({ error: "Blog not found" });
  }
  res.status(204).send();
};
