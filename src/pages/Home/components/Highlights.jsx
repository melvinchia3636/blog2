import React from "react";
import { Icon } from "@iconify/react";

function Highlights() {
  return (
    <section className="grid grid-cols-3 p-8 mt-24 border-2 border-slate-800 border-b-4 rounded-lg relative">
      <div className="text-slate-50 bg-slate-800 absolute right-0 top-0 rounded-bl-md p-2 px-3 font-medium text-sm uppercase tracking-wider flex items-center gap-1.5">
        <Icon icon="ic:round-star" className="w-5 h-5 -mt-0.5" />
        Today's Highlight
      </div>
      <div className="h-full relative">
        <div className="w-full h-full stripe absolute top-2 left-2 rounded-lg"></div>
        <img
          className="h-full object-cover relative rounded-lg"
          src="https://assets.architecturaldigest.in/photos/600835c154beb9e516da82c8/16:9/w_2560%2Cc_limit/Singapore-Jewel-Changi-Airport-Getty-Featured-Image-1366x768.jpg"
        />
      </div>
      <div className="col-span-2 p-8">
        <div className="text-slate-400">
          <span className="text-slate-800 uppercase">
            Travelling&nbsp;&nbsp;·&nbsp;&nbsp;
          </span>{" "}
          Jan 26, 2023
        </div>
        <h2 className="text-3xl font-medium mt-2">
          Chia's Family Trip to Singapore
        </h2>
        <p className="mt-4 text-slate-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
        <button className="border-2 border-b-4 border-slate-800 px-6 py-3 mt-8 rounded-xl font-medium flex items-center">
          Read More
          <Icon icon="uil:arrow-right" className="w-6 h-6 ml-2" />
        </button>
      </div>
    </section>
  );
}

export default Highlights;
