import { Icon } from '@iconify/react';
import React, { useState } from 'react';

function SubmitButton({ onSubmit }) {
  const [loading, setLoading] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        setLoading(true);
        onSubmit().finally(() => setLoading(false));
      }}
      className="flex items-center gap-2 justify-center mt-4 border-zinc-800 bg-zinc-800 border-2 border-b-4 text-sm tracking-widest text-zinc-50 px-6 py-4 rounded-lg font-medium uppercase hover:gap-4 transition-all"
    >
      {loading ? (
        <span className="loader2" />
      ) : (
        <>
          continue
          <Icon
            icon="uil:arrow-right"
            className="w-5 h-5 stroke-[0.5] stroke-zinc-50"
          />
        </>
      )}
    </button>
  );
}

export default SubmitButton;
