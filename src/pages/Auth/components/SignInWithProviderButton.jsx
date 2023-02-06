/* eslint-disable no-underscore-dangle */
import { Icon } from '@iconify/react';
import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React from 'react';
import { auth, firestore } from '../../../firebase';

const PROVIDER = {
  github: GithubAuthProvider,
  google: GoogleAuthProvider,
};

function SignInWithProviderButton({ provider }) {
  const signInWithProvider = () => {
    const _provider = new PROVIDER[provider]();
    auth
      .signInWithPopup(_provider)
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

  return (
    <button
      type="button"
      onClick={signInWithProvider}
      className="border-zinc-800 border-2 border-b-4 text-sm tracking-widest text-zinc-800 w-12 h-12 flex items-center justify-center rounded-lg font-medium uppercase"
    >
      <Icon icon={`uil:${provider}`} className="w-5 h-5" />
    </button>
  );
}

export default SignInWithProviderButton;
