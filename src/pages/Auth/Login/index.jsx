/* eslint-disable no-shadow */
/* eslint-disable import/no-cycle */
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { auth } from '../../../firebase';
import { appContext } from '../../../App';
import InputBox from '../components/InputBox';
import SubmitButton from './components/SubmitButton';
import SignInWithProviderButton from '../components/SignInWithProviderButton';
import OrContinueWith from '../components/OrContinueWith';
import LeadToSignUp from './components/LeadToSignUp';

function Login() {
  const { user } = useContext(appContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user]);

  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center flex-1">
      <Helmet>
        <title>Login | My Life Journey</title>
      </Helmet>
      <h1 className="text-4xl font-medium mb-2">Welcome Back</h1>
      <p className="text-lg">Login to your account to continue your journey.</p>
      <div className="flex flex-col gap-3 w-96 mt-8">
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
        <SubmitButton onSubmit={signIn} />
        <OrContinueWith />
        <div className="flex gap-4 items-center justify-center w-full">
          <SignInWithProviderButton provider="google" />
          <SignInWithProviderButton provider="github" />
        </div>
        <LeadToSignUp />
      </div>
    </div>
  );
}

export default Login;
