import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { Helmet } from 'react-helmet';
import { firestore } from '../../firebase';
import PostCard from './components/PostCard';

function Posts() {
  const [value, loading] = useCollection(collection(firestore, 'posts'));

  return loading ? (
    <div className="flex justify-center items-center flex-1">
      <span className="loader" />
    </div>
  ) : (
    <div className="mt-20 mb-16 flex flex-col gap-8">
      <Helmet>
        <title>Posts | My Life Journey</title>
      </Helmet>
      {value.docs.map((item) => (
        <PostCard item={item} />
      ))}
    </div>
  );
}

export default Posts;
