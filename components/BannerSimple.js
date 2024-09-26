"use client";
import React, { useEffect, useState } from "react";
import { render } from "storyblok-rich-text-react-renderer";
import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";

const BannerSimple = ({ blok }) => {
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
      {/* {React.createElement(
        HeadingTag,
        {
          className: "font-semibold leading-[78px] tracking-tight",
          ...storyblokEditable(blok),
          style: {
            color: blok?.title_color?.color,
          },
        },
        content
      )} */}
      <div className="pb-7" style={{ color: blok?.text_color?.color }}>
        {render(blok.content)}
      </div>
      <div className={`flex gap-3 mt-4 mb-5 ${blok?.button_alignment}`}>
        <Link
          href={blok.button1_link}
          className="bttn banner1_btn_solid"
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
          className="bttn banner1_btn_transparent inline-flex transition duration-300"
          style={{
            backgroundColor: blok?.button2_bg,
            color: blok?.button2_text,
            borderColor: blok?.button2_border_color,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = blok?.button2_hover_bg;
            e.currentTarget.style.color = blok?.button2_text_hover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = blok?.button2_bg;
            e.currentTarget.style.color = blok?.button2_text;
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
          color: blok?.text_color?.color,
        }}
      >
        {render(blok?.content2)}
      </div>
    </main>
  );
};
export default BannerSimple;
