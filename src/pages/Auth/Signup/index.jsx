/* eslint-disable import/no-cycle */
/* eslint-disable no-shadow */
import { Icon } from '@iconify/react';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { appContext } from '../../../App';
import { auth, firestore } from '../../../firebase';

function Signup() {
  const [userName, setUserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { user } = useContext(appContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user]);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then(({ user, additionalUserInfo }) => {
        if (additionalUserInfo.isNewUser) {
          setDoc(doc(firestore, 'users', user.uid), {
            userName: user.displayName,
            avatar: user.photoURL,
            email: user.email,
            bio: null,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signInWithGithub = () => {
    const provider = new GithubAuthProvider();
    auth
      .signInWithPopup(provider)
      .then(({ user, additionalUserInfo }) => {
        if (additionalUserInfo.isNewUser) {
          setDoc(doc(firestore, 'users', user.uid), {
            userName: user.displayName,
            avatar: user.photoURL,
            email: user.email,
            bio: null,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        setDoc(doc(firestore, 'users', user.uid), {
          userName,
          avatar: null,
          email,
          bio: null,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center flex-1">
      <h1 className="text-4xl font-medium mb-2">Welcome to the Community</h1>
      <p className="text-lg">
        Join the community to share your life journey and interact with other
        people
      </p>
      <div className="flex flex-col gap-3 w-96 mt-8">
        <div className="flex items-center gap-3 border-2 border-zinc-800 border-b-4 rounded-xl p-5 py-4">
          <Icon
            icon="uil:user"
            className="stroke-[0.5px] stroke-zinc-800 w-5 h-5"
          />
          <input
            placeholder="Username"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="bg-transparent placeholder-zinc-800 focus:outline-none flex-1"
          />
        </div>
        <div className="flex items-center gap-3 border-2 border-zinc-800 border-b-4 rounded-xl p-5 py-4">
          <Icon
            icon="uil:envelope"
            className="stroke-[0.5px] stroke-zinc-800 w-5 h-5"
          />
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent placeholder-zinc-800 focus:outline-none flex-1"
          />
        </div>
        <div className="flex items-center gap-3 border-2 border-zinc-800 border-b-4 rounded-xl p-5 py-4">
          <Icon
            icon="uil:lock-alt"
            className="stroke-[0.5px] stroke-zinc-800 w-5 h-5"
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent placeholder-zinc-800 focus:outline-none flex-1"
          />
        </div>
        <button
          type="button"
          onClick={signUp}
          className="flex items-center gap-2 justify-center mt-4 border-zinc-800 bg-zinc-800 border-2 border-b-4 text-sm tracking-widest text-zinc-50 px-6 py-4 rounded-lg font-medium uppercase hover:gap-4 transition-all"
        >
          continue
          <Icon
            icon="uil:arrow-right"
            className="w-5 h-5 stroke-[0.5] stroke-zinc-50"
          />
        </button>
        <div className="w-full relative border-b-2 border-zinc-800 my-4">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="bg-white px-2 text-zinc-800 font-medium">
              OR CONTINUE WITH
            </span>
          </div>
        </div>
        <div className="flex gap-4 items-center justify-center w-full">
          <button
            type="button"
            onClick={signInWithGoogle}
            className="border-zinc-800 border-2 border-b-4 text-sm tracking-widest text-zinc-800 w-12 h-12 flex items-center justify-center rounded-lg font-medium uppercase"
          >
            <Icon icon="uil:google" className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={signInWithGithub}
            className="border-zinc-800 border-2 border-b-4 text-sm tracking-widest text-zinc-800 w-12 h-12 flex items-center justify-center rounded-lg font-medium uppercase"
          >
            <Icon icon="uil:github" className="w-5 h-5" />
          </button>
        </div>
        <p className="flex items-center justify-center mt-4">
          Already have an account?
          <Link to="/login" className="text-zinc-800 font-medium ml-1">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
