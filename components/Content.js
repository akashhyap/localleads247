"use client";
import { render } from "storyblok-rich-text-react-renderer";
import { useEffect, useState } from "react";
import { storyblokEditable } from "@storyblok/react";

const Content = ({ blok }) => {
  return (
    <main
      className={`${blok?.max_width} ${
        blok?.max_width ? "mx-auto" : ""
      } content_block ${blok?.text_align}`}
      {...storyblokEditable(blok)}
    >
      {render(blok.content)}
    </main>
  );
};
export default Content;
