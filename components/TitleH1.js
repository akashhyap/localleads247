import { storyblokEditable } from "@storyblok/react";
import React from "react";

const TitleH1 = ({ blok }) => {
  const textColor = {
    color: blok?.textColor?.color || "#000",
  };

  return (
    <div className="md:w-3/5 m-auto">
      <h1
      className="h1_style"
      style={textColor}
      {...storyblokEditable(blok)}
    >
      {blok.text}
    </h1>
    </div>
  );
};

export default TitleH1;
