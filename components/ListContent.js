"use client";
import { render } from "storyblok-rich-text-react-renderer";
import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";

const ListContent = ({ blok }) => {
  const HeadingTag = blok?.title_tag || "p";

  return (
    <div className="flex gap-10 font-sans">
      <div className="big_bullets font-light">{blok?.number}</div>
      <div className="text-[#35384b] mb-14 [&>p]:mt-3 flex-1 [&>h3]:font-medium [&>p]:font-normal leading-normal">{render(blok.content)}</div>
    </div>
  );
};
export default ListContent;
