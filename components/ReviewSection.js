import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import React, { useEffect, useRef } from "react";
import Masonry from "react-masonry-css";
import { render } from "storyblok-rich-text-react-renderer";

const ReviewSection = ({ blok }) => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };
  return (
    <section
      className="bg-[#333333] py-16 lg:pt-24 px-4 reviews"
      {...storyblokEditable(blok)}
    >
      <div className="fluid_container container mx-auto">
        <div className="review_section_title">{render(blok?.title)}</div>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-4"
          columnClassName="pl-4 bg-clip-padding"
        >
          {blok.reviews.map((nestedBlok) => (
            <StoryblokComponent key={nestedBlok._uid} blok={nestedBlok} />
          ))}
        </Masonry>
      </div>
    </section>
  );
};
export default ReviewSection;
