/* eslint-disable import/no-cycle */
/* eslint-disable no-shadow */
import { Icon } from '@iconify/react';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { appContext } from '../../../App';
import { auth, firestore } from '../../../firebase';
import InputBox from '../components/InputBox';
import OrContinueWith from '../components/OrContinueWith';
import SignInWithProviderButton from '../components/SignInWithProviderButton';
import LeadToSignIn from './components/LeadToSignIn';
import SubmitButton from './components/SubmitButton';

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
        <InputBox
          placeholder="Username"
          value={userName}
          setValue={setUserName}
          icon="user"
          type="text"
        />
        <InputBox
          placeholder="Email"
          value={email}
          setValue={setEmail}
          icon="envelope"
          type="email"
        />
        <InputBox
          placeholder="Password"
          value={password}
          setValue={setPassword}
          icon="lock"
          type="password"
        />
        <SubmitButton onSubmit={signUp} />
        <OrContinueWith />
        <div className="flex gap-4 items-center justify-center w-full">
          <SignInWithProviderButton provider="google" />
          <SignInWithProviderButton provider="github" />
        </div>
        <LeadToSignIn />
      </div>
    </div>
  );
}

export default Signup;
