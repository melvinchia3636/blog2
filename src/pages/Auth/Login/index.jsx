import { Icon } from "@iconify/react";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import React from "react";
import { auth } from "../../../firebase";

function Login() {
  //react firebase signin with google
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signInWithGithub = () => {
    const provider = new GithubAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center flex-1">
      <h1 className="text-4xl font-medium mb-2">Welcome Back</h1>
      <p className="text-lg">Login to your account to continue your journey.</p>
      <div className="flex flex-col gap-3 w-96 mt-8">
        <div className="flex items-center gap-3 border-2 border-zinc-800 border-b-4 rounded-xl p-5 py-4">
          <Icon
            icon="uil:envelope"
            className="stroke-[0.5px] stroke-zinc-800 w-5 h-5"
          />
          <input
            placeholder="Email"
            type="password"
            className="bg-transparent placeholder-zinc-800 focus:outline-none"
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
            className="bg-transparent placeholder-zinc-800 focus:outline-none"
          />
        </div>
        <button className="block mt-4 border-zinc-800 bg-zinc-800 border-2 border-b-4 text-sm tracking-widest text-zinc-50 px-6 py-4 rounded-lg font-medium uppercase">
          Login
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
            onClick={signInWithGoogle}
            className="border-zinc-800 border-2 border-b-4 text-sm tracking-widest text-zinc-800 w-12 h-12 flex items-center justify-center rounded-lg font-medium uppercase"
          >
            <Icon icon="uil:google" className="w-5 h-5" />
          </button>
          <button
            onClick={signInWithGithub}
            className="border-zinc-800 border-2 border-b-4 text-sm tracking-widest text-zinc-800 w-12 h-12 flex items-center justify-center rounded-lg font-medium uppercase"
          >
            <Icon icon="uil:github" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
