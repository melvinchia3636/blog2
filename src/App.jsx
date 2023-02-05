import React, { createContext, useEffect, useState } from "react";
import "pattern.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { Route, Routes } from "react-router";
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import Login from "./pages/Auth/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export const appContext = createContext({
  user: null,
});

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <appContext.Provider value={{ user }}>
      <main className="w-full min-h-screen bg-zinc-50 text-zinc-800 pt-16 px-32 flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </main>
    </appContext.Provider>
  );
}

export default App;
