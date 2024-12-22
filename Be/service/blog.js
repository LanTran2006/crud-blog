const fs = require('fs');
const dataFile = './data.json';


const readData = () => {
  if (!fs.existsSync(dataFile)) return [];
  const rawData = fs.readFileSync(dataFile);
  return JSON.parse(rawData || '[]');
};

const writeData = (data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

exports.getAllBlogs = () => {
   return readData();
}

exports.getBlogById = (id) => {
  const blogs = readData();
  return blogs.find((b) => b.id == id);
};

exports.createBlog = (blog) => {
  const blogs = readData();
  const newBlog = { id: Date.now().toString(), ...blog,createdAt: new Date()};
  blogs.push(newBlog);
  writeData(blogs);
  return newBlog;
};

exports.updateBlog = (id, updatedFields) => {
  const blogs = readData();
  const blogIndex = blogs.findIndex((b) => b.id == id);

  if (blogIndex == -1) return null;

  const updatedBlog = {
    ...blogs[blogIndex],
    ...updatedFields,
  };

  blogs[blogIndex] = updatedBlog;
  writeData(blogs);
  return updatedBlog;
};

exports.deleteBlog = (id) => {
  const blogs = readData();
  const updatedBlogs = blogs.filter((b) => b.id != id);

  if (blogs.length == updatedBlogs.length) return false;

  writeData(updatedBlogs);
  return true;
};
