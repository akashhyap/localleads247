import React from "react";
import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

function InnerGrid({blok}) {
  return (
    <div
      className="inner_grid"
      style={{ gridColumn: `span ${blok?.column} / span ${blok?.column}` }}
      {...storyblokEditable(blok)}
    >
      {blok.columns.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
}

export default InnerGrid;
