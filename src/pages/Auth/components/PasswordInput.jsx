import { Icon } from '@iconify/react';
import React from 'react';

function PasswordInput({ password, setPassword }) {
  return (
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
  );
}

export default PasswordInput;
