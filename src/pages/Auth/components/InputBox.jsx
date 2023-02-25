/* eslint-disable object-curly-newline */
import { Icon } from '@iconify/react';
import React from 'react';

function InputBox({
  value,
  setValue,
  icon,
  placeholder,
  type,
  error,
  setError,
}) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 border-2 border-zinc-800 border-b-4 rounded-xl p-5 py-4">
        <Icon
          icon={`uil:${icon}`}
          className="stroke-[0.5px] stroke-zinc-800 w-5 h-5"
        />
        <input
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError('');
          }}
          className="bg-transparent placeholder-zinc-800 focus:outline-none flex-1"
        />
      </div>
      {error && <span className="text-red-500 text-xs mt-1 ml-2">{error}</span>}
    </div>
  );
}

export default InputBox;
