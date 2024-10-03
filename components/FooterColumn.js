"use client";
import { StoryblokComponent } from "@storyblok/react";
import Image from "next/image";
import React from "react";
import { render } from "storyblok-rich-text-react-renderer";

const FooterColumn = ({ blok }) => {
  // console.log("footer", blok);
  return (
    <div className="footer_column">
      <h3>{blok?.title}</h3>
      {blok?.content.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};

export default FooterColumn;
