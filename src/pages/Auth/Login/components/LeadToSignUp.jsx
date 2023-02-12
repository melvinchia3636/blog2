import React from 'react';
import { Link } from 'react-router-dom';

function LeadToSignUp() {
  return (
    <p className="flex items-center justify-center mt-4">
      Don&apos;t have an account?
      <Link to="/register" className="text-zinc-800 font-medium ml-1">
        Register one
      </Link>
    </p>
  );
}

export default LeadToSignUp;
