import React from "react";
import "pattern.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { Route, Routes } from "react-router";
import Posts from "./pages/Posts";
import Post from "./pages/Post";

function App() {
  return (
    <main className="w-full min-h-screen bg-slate-50 text-slate-800 pt-16 px-32 flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/post/:id" element={<Post />} />
        </Routes>
      </div>
      <Footer />
    </main>
  );
}

export default App;
