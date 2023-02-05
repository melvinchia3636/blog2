import { doc } from "firebase/firestore";
import moment from "moment";
import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useParams } from "react-router";
import { firestore } from "../../firebase";

function Post() {
  const { id } = useParams();
  const [value, loading, error] = useDocument(doc(firestore, "posts", id));

  return loading ? (
    <div className="flex justify-center items-center flex-1">
      <span class="loader"></span>
    </div>
  ) : (
    <div className="mt-20 flex flex-col gap-8 mb-12">
      <div
        style={{
          backgroundImage: `url(${value.data().thumbnail})`,
        }}
        className="w-full h-96 bg-no-repeat bg-cover bg-center bg-black/30 bg-blend-multiply rounded-xl flex flex-col justify-end gap-2 text-lg p-8"
      >
        <div className="text-zinc-50">
          <span className="text-zinc-50 uppercase">
            {value.data().category}
            &nbsp;&nbsp;·&nbsp;&nbsp;
          </span>{" "}
          {moment(value.data().date.seconds * 1000).format("MMM DD, YYYY")}
        </div>
        <h1 className="text-5xl font-medium text-zinc-50">
          {value.data().title}
        </h1>
      </div>
      <div className="text-lg">
        <span className="text-4xl font-semibold mr-0.5">
          {value.data().content[0]}
        </span>
        {value.data().content.slice(1)}
      </div>
    </div>
  );
}

export default Post;
