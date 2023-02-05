import React from "react";
import Highlights from "./components/highlights";
import Featured from "./components/Featured";
import Latest from "./components/Latest";

export default function Home() {
  return (
    <>
      <Highlights />
      <Featured />
      <Latest />
    </>
  );
}
