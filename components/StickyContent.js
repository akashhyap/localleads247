"use client";
import React, { useEffect, useState } from "react";
import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
import { render } from "storyblok-rich-text-react-renderer";
import Link from "next/link";
import Image from "next/image";
import Lottie from "lottie-react";
import animationData from "../animation/lottie.json"
const StickyContent = ({ blok }) => {
  const HeadingTag = blok?.title_tag || "p";
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (blok.title_label) {
      setContent(render(blok.title_label));
    }
  }, [blok.title_label]);
  return (
    <div {...storyblokEditable(blok)} className="bg-[#ececec]">
      <div
        className="px-4 grid grid-cols-2 gap-10 fluid_container sticky_section"
        style={{
          paddingTop: blok?.padding_top,
          paddingBottom: blok?.padding_bottom,
        }}
      >
        {/* Left Column: Sticky Section */}
        <div
          className="sticky top-0 self-start"
          style={{ height: "fit-content" }}
        >
          <div className="uppercase mb-5">{blok?.badge}</div>
          {React.createElement(
            HeadingTag,
            {
              className: "lg:leading-snug mb-4 font-semibold sticky_content_title",
              ...storyblokEditable(blok),
            },
            content
          )}
          <div className="relative w-full aspect-w-16 aspect-h-9">
            {/* <Image
              src={blok?.image?.filename}
              alt=""
              fill
              className="w-full object-center object-contain"
            /> */}
             <Lottie animationData={animationData} />
          </div>
        </div>

        {/* Right Column: Scrollable Content */}
        <div className="sticky_content">
          {blok.content.map((nestedBlok) => (
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default StickyContent;
