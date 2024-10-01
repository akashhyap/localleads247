import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
import React from "react";

const Grid = ({ blok }) => {
  return (
    <div
      className="grid sm_grid"
      style={{ gridTemplateColumns: `repeat(${blok?.column}, minmax(0, 1fr))` }}
      {...storyblokEditable(blok)}
    >
      {blok.columns.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};

export default Grid;
