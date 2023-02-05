import { Icon } from "@iconify/react";
import React, { useContext } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { appContext } from "../App";

export default function Navbar() {
  const location = useLocation();
  const { user } = useContext(appContext);

  return (
    <nav className="flex items-center justify-between">
      <div className="w-full flex items-center gap-8">
        <h1 className="text-2xl font-medium tracking-wide">
          My Life <span className="text-orange-500">Journey</span>.
        </h1>
        <div className="border-2 w-full mx-16 border-zinc-800 border-b-4 rounded-xl p-3 py-2 flex items-center gap-2">
          <Icon
            icon="uil:search"
            className="stroke-1 stroke-zinc-800 w-[1.1rem] h-[1.1rem]"
          />
          <input
            placeholder="Search..."
            className="bg-transparent placeholder-zinc-800 focus:outline-none"
          />
        </div>
      </div>
      <div className="flex items-center gap-12">
        <ul className="flex justify-end items-center gap-16 relative">
          {["/", "/posts"].includes(location.pathname) && (
            <div
              className={`w-6 border-b-2 rounded-full absolute -bottom-1 border-orange-500 transition-all duration-200 ${
                location.pathname === "/" ? "left-5" : "left-[9.5em]"
              }`}
            />
          )}
          <li className="uppercase font-medium tracking-widest text-sm w-16 text-center">
            <Link to="/">home</Link>
          </li>
          <li className="uppercase font-medium tracking-widest text-sm w-16 text-center">
            <Link to="/posts">explore</Link>
          </li>
        </ul>
        {user ? (
          <div className="flex items-center gap-4 flex-shrink-0 ml-6">
            <img
              src={user?.photoURL}
              alt=""
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full flex-shrink-0"
            />
            <span className="font-medium tracking-wide">
              {user?.displayName}
            </span>
            <button className=" text-sm tracking-widest text-zinc-800 p-2 -ml-2 flex items-center justify-center rounded-lg font-medium uppercase">
              <Icon
                icon="uil:angle-down"
                className="w-6 h-6 stroke-[0.5px] stroke-zinc-800"
              />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login">
              <button className="block  px-6 py-2 rounded-lg font-medium tracking-widest text-sm uppercase">
                Login
              </button>
            </Link>
            <button className="block border-zinc-800 border-2 border-b-4 text-sm tracking-widest text-zinc-800 px-6 py-3 rounded-lg font-medium uppercase">
              Signup
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
