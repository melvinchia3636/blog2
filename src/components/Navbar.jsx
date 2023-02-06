/* eslint-disable import/no-cycle */
import { Menu, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react';
import React, { Fragment, useContext } from 'react';
import ReactJdenticon from 'react-jdenticon';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { appContext } from '../App';
import { auth } from '../firebase';

export default function Navbar() {
  const location = useLocation();
  const { user, userData } = useContext(appContext);

  return (
    <nav className="flex items-center">
      <Link to="/">
        <h1 className="text-2xl font-medium tracking-wide">
          My Life
          <br />
          Journey.
        </h1>
      </Link>
      <div className="border-2 flex-1 mx-16 border-zinc-800 border-b-4 rounded-xl p-3 py-2 flex items-center gap-2">
        <Icon
          icon="uil:search"
          className="stroke-1 stroke-zinc-800 w-[1.1rem] h-[1.1rem]"
        />
        <input
          placeholder="Search..."
          className="bg-transparent placeholder-zinc-800 focus:outline-none"
        />
      </div>
      <div className="flex items-center gap-12">
        <ul className="flex justify-end items-center gap-16 relative">
          {['/', '/posts'].includes(location.pathname) && (
            <div
              className={`w-6 border-b-2 rounded-full absolute -bottom-1 border-zinc-800 transition-all duration-200 ${
                location.pathname === '/' ? 'left-5' : 'left-[9.5em]'
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
          <Menu as="div" className="relative ml-7">
            <Menu.Button className="flex items-center gap-4">
              {userData.avatar ? (
                <img
                  src={userData.avatar}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full flex-shrink-0"
                />
              ) : (
                <ReactJdenticon size="32" value={user.userName} />
              )}
              <div className="font-medium tracking-wide zinc-50space-nowrap flex-shrink-0">
                {userData.userName}
              </div>
              <Icon
                icon="uil:angle-down"
                className="w-6 h-6 stroke-[0.5px] stroke-zinc-800 flex-shrink-0"
              />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute z-10 right-0 mt-4 w-56 origin-top-right rounded-md bg-zinc-50 shadow-lg border-2 border-zinc-800">
                <Menu.Item>
                  {({ active }) => (
                    <Link to="/profile">
                      <button
                        type="button"
                        className={`${
                          active ? 'bg-zinc-800 text-zinc-50' : 'text-gray-900'
                        } group flex w-full items-center rounded-sm p-4 gap-2 transition-all`}
                      >
                        <Icon
                          icon="uil:user"
                          className="w-5 h-5 stroke-[0.5px] stroke-zinc-800"
                        />
                        Profile
                      </button>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      onClick={() => auth.signOut()}
                      className={`${
                        active ? 'bg-zinc-800 text-zinc-50' : 'text-gray-900'
                      } group flex w-full items-center rounded-sm p-4 gap-2 transition-all`}
                    >
                      <Icon
                        icon="uil:signout"
                        className="w-5 h-5 stroke-[0.5px] stroke-zinc-800"
                      />
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login">
              <button
                type="button"
                className="block  px-6 py-2 rounded-lg font-medium tracking-widest text-sm uppercase"
              >
                Login
              </button>
            </Link>
            <Link to="/register">
              <button
                type="button"
                className="block border-zinc-800 border-2 border-b-4 text-sm tracking-widest text-zinc-800 px-6 py-3 rounded-lg font-medium uppercase"
              >
                Signup
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
