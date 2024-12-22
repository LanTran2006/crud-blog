import { useState } from "react";
import "./App.css";
import HomePage from "./components/Homepage";
import CreatePage from "./components/Create";
import Detail from "./components/Detail";
import Edit from './components/Edit'
import { Route, Routes, Link } from "react-router-dom";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <header>
        <h1>Blog App</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/blogs/create">Add Blog</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs/create" element={<CreatePage />} />
        <Route path="/blogs/:id" element={<Detail />} />
        <Route path="/blogs/:id/edit" element={<Edit/>} />
      </Routes>
    </>
  );
}

export default App;
