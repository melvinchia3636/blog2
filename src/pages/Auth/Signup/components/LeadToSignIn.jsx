import React from 'react';
import { Link } from 'react-router-dom';

function LeadToSignIn() {
  return (
    <p className="flex items-center justify-center mt-4">
      Already have an account?
      <Link to="/login" className="text-zinc-800 font-medium ml-1">
        Sign in
      </Link>
    </p>
  );
}

export default LeadToSignIn;
