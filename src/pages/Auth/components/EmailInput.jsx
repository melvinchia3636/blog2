import { Icon } from '@iconify/react';
import React from 'react';

function EmailInput({ email, setEmail }) {
  return (
    <div className="flex items-center gap-3 border-2 border-zinc-800 border-b-4 rounded-xl p-5 py-4">
      <Icon
        icon="uil:envelope"
        className="stroke-[0.5px] stroke-zinc-800 w-5 h-5"
      />
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-transparent placeholder-zinc-800 focus:outline-none flex-1"
      />
    </div>
  );
}

export default EmailInput;
