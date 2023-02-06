import React from 'react';
import { Helmet } from 'react-helmet';
import Highlights from './components/Highlights';
import Featured from './components/Featured';
import Latest from './components/Latest';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home | My Life Journey</title>
      </Helmet>
      <Highlights />
      <Featured />
      <Latest />
    </>
  );
}
