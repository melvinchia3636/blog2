/* eslint-disable react/jsx-no-bind */
/* eslint-disable consistent-return */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/no-cycle */
/* eslint-disable no-shadow */
import { setDoc, doc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appContext } from '../../../App';
import { auth, firestore } from '../../../firebase';
import InputBox from '../components/InputBox';
import OrContinueWith from '../components/OrContinueWith';
import SignInWithProviderButton from '../components/SignInWithProviderButton';
import LeadToSignIn from './components/LeadToSignIn';
import SubmitButton from './components/SubmitButton';

function Signup() {
  const { user } = useContext(appContext);
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user]);

  async function signUp() {
    if (userName.length < 3) {
      setUsernameError('Username must be at least 3 characters long');
      throw new Error('Username must be at least 3 characters long');
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailError('Please enter a valid email');
      throw new Error('Please enter a valid email');
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      throw new Error('Password must be at least 6 characters long');
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      throw new Error('Passwords do not match');
    }

    return auth
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
        if (err.code === 'auth/email-already-in-use') {
          setEmailError('Email already in use');
        }

        if (err.code === 'auth/invalid-email') {
          setEmailError('Please enter a valid email');
        }

        if (err.code === 'auth/weak-password') {
          setPasswordError('Password must be at least 6 characters long');
        }

        if (err.code === 'auth/operation-not-allowed') {
          setEmailError('Email already in use');
        }
      });
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center flex-1 my-16 mt-24">
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
          error={usernameError}
          setError={setUsernameError}
        />
        <InputBox
          placeholder="Email"
          value={email}
          setValue={setEmail}
          icon="envelope"
          type="email"
          error={emailError}
          setError={setEmailError}
        />
        <InputBox
          placeholder="Password"
          value={password}
          setValue={setPassword}
          icon="lock"
          type="password"
          error={passwordError}
          setError={setPasswordError}
        />
        <InputBox
          placeholder="Confirm password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          icon="lock"
          type="password"
          error={confirmPasswordError}
          setError={setConfirmPasswordError}
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
