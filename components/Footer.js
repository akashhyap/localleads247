"use client";
import { StoryblokComponent } from "@storyblok/react";
import Image from "next/image";
import React from "react";
import { render } from "storyblok-rich-text-react-renderer";

const Footer = ({ blok }) => {
  // console.log("footer", blok);
  return (
    <div className="footer pt-16">
      <div className="fluid_container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {blok?.footer.map((nestedBlok) => (
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
          ))}
        </div>
      </div>
      <div className="py-3 mt-16 text-xs text-center text-white bg-black">
        {render(blok?.copyright)}
      </div>
    </div>
  );
};

export default Footer;
