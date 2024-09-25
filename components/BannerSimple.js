"use client";
import React, { useEffect, useState } from "react";
import { render } from "storyblok-rich-text-react-renderer";
import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";

const BannerSimple = ({ blok }) => {
  const HeadingTag = blok?.title_tag || "p";
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (blok.title_label) {
      setContent(render(blok.title_label));
    }
  }, [blok.title_label]);
  return (
    <main
      className={`px-4 ${blok?.content_alignment} ${blok?.max_width} ${
        blok?.max_width ? "mx-auto" : ""
      } ${blok?.text_align}`}
      style={{
        paddingTop: blok?.padding_top,
        paddingBottom: blok?.padding_bottom,
      }}
      {...storyblokEditable(blok)}
    >
      {React.createElement(
        HeadingTag,
        {
          className: "lg:leading-snug mb-4 font-sans font-bold",
          ...storyblokEditable(blok),
        },
        content
      )}
      {render(blok.content)}
      <div className={`flex gap-3 mt-4 mb-5 ${blok?.button_alignment}`}>
        <Link
          href={blok.button1_link}
          className="bttn banner1_btn_solid hover:bg-[]"
          style={{
            backgroundColor: blok?.button1_bg,
            color: blok?.button1_text,
            borderColor: blok?.button1_border_color,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = blok?.button1_hover_bg)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = blok?.button1_bg)
          }
        >
          {blok.button1_label}
        </Link>
        <Link
          href={blok.button2_link}
          className="bttn banner1_btn_transparent"
          style={{
            backgroundColor: blok?.button2_bg,
            color: blok?.button2_text,
            borderColor: blok?.button2_border_color,
          }}
        >
          {blok.button2_label}
          <span
            className="ml-2 transition-transform duration-300 transform hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </Link>
      </div>
      <div
        style={{
          paddingTop: blok?.content2_pt,
        }}
      >
        {render(blok?.content2)}
      </div>
    </main>
  );
};
export default BannerSimple;
