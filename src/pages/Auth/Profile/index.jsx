/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable import/no-cycle */
import { Icon } from '@iconify/react';
import { collection, doc, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router';
import { deleteObject, getStorage, ref, uploadBytes } from 'firebase/storage';
import ReactJdenticon from 'react-jdenticon';
import { appContext } from '../../../App';
import { firestore } from '../../../firebase';
import PostCard from '../../Posts/components/PostCard';

function Profile() {
  const { user, userData, userDataRef, setUpdateAvatar } =
    useContext(appContext);
  const [value, loading] = useCollection(collection(firestore, 'posts'));
  const navigate = useNavigate();
  const avatarFileUpload = useRef(null);
  const bannerFileUpload = useRef(null);
  const [refreshAvatar, setRefreshAvatar] = useState(Math.random());
  const [refreshBanner, setRefreshBanner] = useState(Math.random());

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  const uploadBanner = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;

    const storage = getStorage();
    if (userDataRef.current.banner) {
      const storageRef = ref(storage, userDataRef.current.banner);
      await deleteObject(storageRef);
    }

    const storageRef = ref(
      storage,
      `banners/${user.uid}.${file.name.split('.').pop()}`,
    );

    uploadBytes(storageRef, file).then((snapshot) => {
      const userRef = doc(firestore, 'users', user.uid);
      updateDoc(userRef, {
        banner: snapshot.metadata.fullPath,
      }).then(() => {
        setRefreshBanner(Math.random());
      });
    });
  };

  const uploadAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;

    const storage = getStorage();
    if (
      userDataRef.current.avatar &&
      userDataRef.current.avatar.startsWith(
        'https://firebasestorage.googleapis.com',
      )
    ) {
      const storageRef = ref(
        storage,
        decodeURIComponent(
          userDataRef.current.avatar.split('?')[0].split('/').pop(),
        ),
      );
      await deleteObject(storageRef).catch(() => {});
    }

    const storageRef = ref(
      storage,
      `avatars/${user.uid}.${file.name.split('.').pop()}`,
    );

    uploadBytes(storageRef, file).then((snapshot) => {
      const userRef = doc(firestore, 'users', user.uid);
      updateDoc(userRef, {
        avatar: `https://firebasestorage.googleapis.com/v0/b/blog-a44d5.appspot.com/o/${encodeURIComponent(
          snapshot.metadata.fullPath,
        )}?alt=media`,
      }).then(() => {
        setRefreshAvatar(Math.random());
        setUpdateAvatar(Math.random());
      });
    });
  };

  return (
    <div className="w-full h-full flex flex-col items-center flex-1 my-16 mt-24">
      <Helmet>
        <title>Profile | My Life Journey</title>
      </Helmet>
      <div
        className="w-full h-96 bg-black rounded-xl bg-cover relative border-2 border-zinc-800"
        style={{
          backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/blog-a44d5.appspot.com/o/${encodeURIComponent(
            userData?.banner,
          )}?alt=media#${refreshBanner})`,
        }}
      >
        <button
          type="button"
          onClick={() => bannerFileUpload.current.click()}
          className="border-2 border-b-4 border-zinc-800 bg-zinc-50 absolute bottom-4 right-4 px-4 py-2 rounded-lg font-medium flex items-center gap-1.5"
        >
          <Icon
            icon="uil:camera"
            className="w-5 h-5 -mt-[2px] stroke-[0.5px] stroke-zinc-800"
          />
          Edit Banner
        </button>
        <div className="p-1 bg-gray-50 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full">
          <img
            src={
              userData?.avatar ? (
                `${userData?.avatar}#${refreshAvatar}`
              ) : (
                <ReactJdenticon size="32" value={user?.userName} />
              )
            }
            alt="avatar"
            className="w-40 h-40 rounded-full object-cover border-2 border-zinc-800"
          />
          <button
            type="button"
            onClick={() => avatarFileUpload.current.click()}
            className="w-40 h-40 bg-zinc-800/50 opacity-0 hover:opacity-100 transition-opacity absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full z-50 flex items-center justify-center"
          >
            <Icon icon="uil:camera" className="w-10 h-10 text-zinc-50" />
          </button>
        </div>
      </div>
      <h1 className="mt-24 text-3xl font-medium">{userData?.userName}</h1>
      <p className="mt-2">
        Computer programs are the most complex things that humans make.
      </p>
      <div className="mt-8 flex gap-2">
        <span className="font-medium">3,636</span> followers &nbsp;·
        <span className="font-medium">1,000</span> following &nbsp;·
        <span className="font-medium">1,000</span> posts
      </div>
      <button
        type="button"
        className="w-full border-2 border-b-4 border-zinc-800 mt-16 rounded-lg p-6 flex items-center gap-4 text-xl hover:bg-zinc-700 hover:text-zinc-50 transition-all"
      >
        <img
          src={userData?.avatar}
          alt="avatar"
          className="w-12 h-12 rounded-full"
        />
        What&apos;s on your mind?
      </button>
      {!loading && (
        <div className="mt-8 flex flex-col gap-8">
          {value.docs.map((item) => (
            <PostCard item={item} />
          ))}
        </div>
      )}
      <input
        type="file"
        ref={avatarFileUpload}
        hidden
        accept="image/*"
        multiple={false}
        onChange={uploadAvatar}
      />
      <input
        type="file"
        ref={bannerFileUpload}
        hidden
        accept="image/*"
        multiple={false}
        onChange={uploadBanner}
      />
    </div>
  );
}

export default Profile;
