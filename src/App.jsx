/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-underscore-dangle */
import React, { createContext, useEffect, useState } from 'react';
import 'pattern.css';
import { Route, Routes } from 'react-router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Helmet } from 'react-helmet';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Posts from './pages/Posts';
import Post from './pages/Post';
import Login from './pages/Auth/Login';
import { auth, firestore } from './firebase';
import Signup from './pages/Auth/Signup';
import Profile from './pages/Auth/Profile';

export const appContext = createContext({
  user: null,
  userData: {},
});

function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, async (_user) => {
      if (_user) {
        const docRef = doc(firestore, 'users', _user.uid);
        const _userData = await getDoc(docRef);

        setUser(_user);
        setUserData(_userData.data());
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <appContext.Provider value={{ user, userData }}>
      <main className="w-full min-h-screen bg-zinc-50 text-zinc-800 pt-16 px-32 flex flex-col">
        <Helmet>
          <title>My Life Journey</title>
        </Helmet>
        <Navbar />
        <div className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <Footer />
      </main>
    </appContext.Provider>
  );
}

export default App;
