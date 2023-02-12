import { faker } from '@faker-js/faker';
import { Icon } from '@iconify/react';
import moment from 'moment';
import React from 'react';

function PostCard({ item }) {
  const data = item.data();
  return (
    <div
      key={item.id}
      className="p-8 border-2 border-zinc-800 border-b-4 rounded-lg flex gap-8 h-96"
    >
      <div className="relative h-full aspect-square">
        <div className="w-full h-full rounded-md bg-zinc-800 absolute top-2 left-2" />
        <img
          alt=""
          className="h-full w-full aspect-video object-cover relative rounded-md"
          src={data.thumbnail}
        />
      </div>
      <div className="mt-6 flex flex-col">
        <div className="text-zinc-400">
          <span className="text-zinc-800 uppercase">
            {data.category}
            &nbsp;&nbsp;·&nbsp;&nbsp;
          </span>
          {moment(data.date.seconds * 1000).format('MMM DD, YYYY')}
        </div>
        <h2 className="text-3xl font-medium mt-2">{data.title}</h2>
        <p className="mt-4 text-zinc-400 desc">{data.abstract}</p>
        <div className="flex items-end flex-grow justify-between">
          <div className="flex items-end flex-grow mt-4">
            <div className="flex items-center gap-2">
              <img
                alt=""
                src={`https://i.pravatar.cc/300#${Math.random()}`}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-zinc-800 font-medium">
                {faker.name.firstName()}
                {faker.name.lastName()}
              </span>
            </div>
          </div>
          <div className="flex gap-8">
            <button type="button" className="flex items-center">
              <Icon
                icon="uil:thumbs-up"
                className="w-6 h-6 mr-2 flex-shrink-0"
              />
              Like
            </button>
            <button type="button" className="flex items-center">
              <Icon
                icon="uil:thumbs-down"
                className="w-6 h-6 mr-2 flex-shrink-0"
              />
              Dislike
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
