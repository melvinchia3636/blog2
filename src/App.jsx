/* eslint-disable object-curly-newline */
/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-underscore-dangle */
import React, { createContext, useEffect, useRef, useState } from 'react';
import 'pattern.css';
import { Route, Routes } from 'react-router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { Helmet } from 'react-helmet';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Posts from './pages/Posts';
import Login from './pages/Auth/Login';
import { auth, firestore } from './firebase';
import Signup from './pages/Auth/Signup';
import Profile from './pages/Auth/Profile';

export const appContext = createContext({
  user: null,
  userData: {},
  userDataRef: {},
  updateAvatar: Math.random(),
  setUpdateAvatar: () => {},
});

function App() {
  const [user, setUser] = useState(null);
  const [userData, _setUserData] = useState({});
  const [updateAvatar, setUpdateAvatar] = useState(Math.random());
  const userDataRef = useRef(userData);

  const setUserData = (data) => {
    userDataRef.current = data;
    _setUserData(data);
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (_user) => {
      if (_user) {
        const docRef = doc(firestore, 'users', _user.uid);
        onSnapshot(docRef, (_doc) => {
          setUserData(_doc.data());
        });

        setUser(_user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <appContext.Provider
      value={{ user, userData, userDataRef, updateAvatar, setUpdateAvatar }}
    >
      <main className="w-full min-h-screen bg-zinc-50 text-zinc-800 flex flex-col relative">
        <Helmet>
          <title>My Life Journey</title>
        </Helmet>
        <Navbar />
        <div className="flex-1 flex flex-col mt-20 px-32">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Posts />} />
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
