import React from "react";
import { Icon } from "@iconify/react";
import { faker } from "@faker-js/faker";

function Latest() {
  return (
    <section className="mt-16">
      <h2 className="text-4xl font-medium text-center mb-2">Latest Posts</h2>
      <div className="flex justify-center mb-6">
        <span className="w-12 block border-b-4 rounded-full border-orange-500"></span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div className="p-8 border-2 border-slate-800 border-b-4 rounded-lg flex flex-col h-full">
              <div className="relative">
                <div className="w-full h-full rounded-md bg-slate-800 absolute top-2 left-2"></div>
                <img
                  className="h-full w-full aspect-video object-cover relative rounded-md"
                  src={`https://picsum.photos/1200/900?random=${Math.random()}`}
                />
              </div>
              <div className="mt-6 flex flex-col h-full">
                <div className="text-slate-400">
                  <span className="text-slate-800 uppercase">
                    {faker.helpers.arrayElement([
                      "Travelling",
                      "Life",
                      "Involution",
                      "Programming",
                    ])}
                    &nbsp;&nbsp;·&nbsp;&nbsp;
                  </span>{" "}
                  Jan 26, 2023
                </div>
                <h2 className="text-3xl font-medium mt-2">
                  {faker.lorem.sentence(5)}
                </h2>
                <p className="mt-4 text-slate-400 desc">
                  {faker.lorem.paragraph(2)}
                </p>
                <div className="flex items-end flex-grow">
                  <button className="border-2 w-min whitespace-nowrap border-b-4 border-slate-800 px-6 py-3 mt-8 rounded-xl font-medium flex items-center">
                    Read More
                    <Icon
                      icon="uil:arrow-right"
                      className="w-6 h-6 ml-2 flex-shrink-0"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default Latest;
