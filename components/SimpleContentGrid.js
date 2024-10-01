import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
import React from "react";

const SimpleContentGrid = ({ blok }) => {
  return (
    <div
      className="fluid_container container grid simple_content_grid"
      style={{
        gridTemplateColumns: `repeat(${blok?.column}, minmax(0, 1fr))`,
        paddingTop: blok?.padding_top,
        paddingBottom: blok?.padding_bottom,
      }}
      {...storyblokEditable(blok)}
    >
      {blok.content.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};

export default SimpleContentGrid;
