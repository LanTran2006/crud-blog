const express = require('express');
const blogRoutes = require('./routes/blog.js');
let cors=require('cors')
const corsOptions = {
  origin: 'http://localhost:5173', 
};


const app = express();
const PORT = 5000;

app.use(cors(corsOptions));
app.use(express.json());

// Route setup
app.use('/blogs', blogRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
