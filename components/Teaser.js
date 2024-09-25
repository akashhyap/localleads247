import { storyblokEditable } from "@storyblok/react";
import React from "react";

const Teaser = ({ blok }) => {
  // console.log("blok", blok);

  return (
    <div className="md:w-3/5 m-auto">
      <h1 {...storyblokEditable(blok)}>{blok.headline}</h1>
    </div>
  );
};

export default Teaser;
