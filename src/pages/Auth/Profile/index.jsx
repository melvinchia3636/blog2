/* eslint-disable import/no-cycle */
import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router';
import { appContext } from '../../../App';

function Profile() {
  const { user } = useContext(appContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  return (
    <div>
      <Helmet>
        <title>Profile | My Life Journey</title>
      </Helmet>
      Profile
    </div>
  );
}

export default Profile;
