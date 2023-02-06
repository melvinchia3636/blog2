/* eslint-disable no-shadow */
/* eslint-disable import/no-cycle */
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { auth } from '../../../firebase';
import { appContext } from '../../../App';
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import SubmitButton from './components/SubmitButton';
import SignInWithProviderButton from '../components/SignInWithProviderButton';

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
        <EmailInput email={email} setEmail={setEmail} />
        <PasswordInput password={password} setPassword={setPassword} />
        <SubmitButton onSubmit={signIn} />
        <div className="w-full relative border-b-2 border-zinc-800 my-4">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="bg-white px-2 text-zinc-800 font-medium">
              OR CONTINUE WITH
            </span>
          </div>
        </div>
        <div className="flex gap-4 items-center justify-center w-full">
          <SignInWithProviderButton provider="google" />
          <SignInWithProviderButton provider="github" />
        </div>
        <p className="flex items-center justify-center mt-4">
          Don&apos;t have an account?
          <Link to="/register" className="text-zinc-800 font-medium ml-1">
            Register one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
