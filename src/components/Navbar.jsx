import { Icon } from "@iconify/react";
import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="flex items-center justify-between">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl font-medium tracking-wide">
          My Life <span className="text-orange-500">Journey</span>.
        </h1>
      </div>
      <ul className="flex justify-start w-full items-center gap-16 relative">
        <div
          className={`w-6 border-b-2 rounded-full absolute bottom-2 border-orange-500 transition-all duration-200 ${
            location.pathname === "/" ? "left-5" : "left-[9.2rem]"
          }`}
        />
        <li className="uppercase font-medium tracking-widest text-sm w-16 text-center">
          <Link to="/">home</Link>
        </li>
        <li className="uppercase font-medium tracking-widest text-sm w-16 text-center">
          <Link to="/posts">posts</Link>
        </li>
        <li className="uppercase font-medium tracking-widest text-sm text-center">
          <a>portfolio</a>
        </li>
        <li className="uppercase font-medium tracking-widest text-sm text-center">
          <a>contact</a>
        </li>
        <div className="border-2 border-slate-800 border-b-4 rounded-xl p-3 py-2 flex items-center gap-2">
          <Icon
            icon="uil:search"
            className="stroke-1 stroke-slate-800 w-[1.1rem] h-[1.1rem]"
          />
          <input
            placeholder="Search..."
            className="bg-transparent placeholder-slate-800 focus:outline-none"
          />
        </div>
      </ul>
    </nav>
  );
}
