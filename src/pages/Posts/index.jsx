import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "@firebase/firestore";
import { firestore } from "../../firebase";
import { Icon } from "@iconify/react";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import { faker } from "@faker-js/faker";

function Posts() {
  const [value, loading, error] = useCollection(collection(firestore, "posts"));

  return loading ? (
    <div className="flex justify-center items-center flex-1">
      <span class="loader"></span>
    </div>
  ) : (
    <div className="mt-20 flex flex-col gap-8">
      {value.docs.map((item) => {
        const data = item.data();
        return (
          <div
            key={item.id}
            className="p-8 border-2 border-zinc-800 border-b-4 rounded-lg flex gap-8 h-96"
          >
            <div className="relative h-full aspect-square">
              <div className="w-full h-full rounded-md bg-zinc-800 absolute top-2 left-2"></div>
              <img
                className="h-full w-full aspect-video object-cover relative rounded-md"
                src={data.thumbnail}
              />
            </div>
            <div className="mt-6 flex flex-col">
              <div className="text-zinc-400">
                <span className="text-zinc-800 uppercase">
                  {data.category}
                  &nbsp;&nbsp;·&nbsp;&nbsp;
                </span>{" "}
                {moment(data.date.seconds * 1000).format("MMM DD, YYYY")}
              </div>
              <h2 className="text-3xl font-medium mt-2">{data.title}</h2>
              <p className="mt-4 text-zinc-400 desc">{data.abstract}</p>
              <div className="flex items-end flex-grow justify-between">
                <div className="flex items-end flex-grow mt-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://i.pravatar.cc/300#${Math.random()}`}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-zinc-800 font-medium">
                      {faker.name.firstName()} {faker.name.lastName()}
                    </span>
                  </div>
                </div>
                <p className="flex items-center">
                  <Icon icon="uil:eye" className="w-6 h-6 mr-2 flex-shrink-0" />
                  {data.view} views
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Posts;
