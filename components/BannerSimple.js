"use client";
import React, { useEffect, useState } from "react";
import { render } from "storyblok-rich-text-react-renderer";
import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
import Link from "next/link";
import Image from "next/image";
import { MdLockClock } from "react-icons/md";
import { IoIosStar } from "react-icons/io";

const BannerSimple = ({ blok }) => {
  const renderStars = (rating) => {
    // Set default rating to 5 if no value is provided
    const validRating = rating;
    const fullStars = Math.max(0, Math.floor(validRating)); // Ensure fullStars is non-negative

    return (
      <div className="rating_stars flex">
        {/* Full stars */}
        {[...Array(fullStars)].map((_, index) => (
          <IoIosStar
            key={`full-${index}`}
            aria-hidden="true"
            className="text-[#ffa534] h-5 w-5"
          />
        ))}
      </div>
    );
  };

  return (
    <main
      className={`container banner_simple mx-auto ${blok?.content_alignment}`}
      style={{
        paddingTop: blok?.padding_top,
        paddingBottom: blok?.padding_bottom,
      }}
      {...storyblokEditable(blok)}
    >
      <div className="banner_simple_inner">
        <div
          className="banner_simple_intro pb-7"
          style={{ color: blok?.text_color?.color }}
        >
          {blok.eyebrow_text && (
            <div className="mb-5">
              <span className="eyebrow_text">{blok.eyebrow_text}</span>
            </div>
          )}
          {render(blok.content)}
        </div>
        <div
          className={`flex flex-wrap gap-3 mt-4 mb-5 ${blok?.button_alignment}`}
        >
          {blok?.button1_label && blok?.button1_link?.cached_url ? (
            <Link
              href={blok.button1_link}
              className="bttn banner1_btn_solid"
              style={{
                backgroundColor: blok?.button1_bg,
                color: blok?.button1_text,
                borderColor: blok?.button1_border_color,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = blok?.button1_hover_bg;
                e.currentTarget.style.color = blok?.button1_text_hover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = blok?.button1_bg;
                e.currentTarget.style.color = blok?.button1_text;
              }}
            >
              {blok.button1_label}
            </Link>
          ) : null}
          {blok?.button2_label && blok?.button2_link?.cached_url ? (
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
          ) : null}
        </div>
        <div
          className="banner_simple_content2"
          style={{
            paddingTop: blok?.content2_pt,
            color: blok?.text_color?.color,
          }}
        >
          {blok?.content2_simple_text && (
            <span>
              <MdLockClock size="1.3em" />
            </span>
          )}
          <span>{blok?.content2_simple_text}</span>
          {render(blok?.content2)}
        </div>
        <div className="rating_wrapper">
          <div className="rating">
            {blok?.rating && renderStars(blok?.rating)}{" "}
            <span>{blok?.rating_text}</span>
          </div>
          <div className="community_wrapper">
            <div className="community_images">
              {blok?.community_images &&
                blok?.community_images.map((nestedBlok) => (
                  <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
                ))}
            </div>
            <span>{blok?.community_text}</span>
          </div>
        </div>
      </div>
    </main>
  );
};
export default BannerSimple;
