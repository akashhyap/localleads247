"use client";
import { render } from "storyblok-rich-text-react-renderer";
import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";

const ListContent = ({ blok }) => {
  const HeadingTag = blok?.title_tag || "p";

  return (
    <div className="flex gap-10">
      <div className="big_bullets">{blok?.number}</div>
      <div className="text-[#35384b] mb-8 [&>p]:mt-3 flex-1">{render(blok.content)}</div>
    </div>
  );
};
export default ListContent;
