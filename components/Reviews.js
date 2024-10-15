import { storyblokEditable } from "@storyblok/react";
import { IoIosStar } from "react-icons/io";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { render } from "storyblok-rich-text-react-renderer";

export default function Reviews({ blok }) {
  // console.log("Reviews", blok);
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Full stars
    const halfStar = rating % 1 !== 0; // Check if there's a half star
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining empty stars

    return (
      <div className="flex">
        {/* Full stars */}
        {[...Array(fullStars)].map((_, index) => (
          <IoIosStar
            key={`full-${index}`}
            aria-hidden="true"
            className="text-white h-5 w-5"
          />
        ))}
        {/* Half star */}
        {halfStar && (
          <IoIosStar
            key="half"
            aria-hidden="true"
            className="text-white h-5 w-5"
            style={{ clipPath: "inset(0 50% 0 0)" }} // For the half star effect
          />
        )}
        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, index) => (
          <IoIosStar
            key={`empty-${index}`}
            aria-hidden="true"
            className="h-5 w-5"
            style={{ fill: "none", stroke: "currentColor", strokeWidth: "2" }}
          />
        ))}
      </div>
    );
  };
  return (
    <div className="review mb-5">
      <div className="review_name [&>p]:text-[#fff] font-semibold">
        <h3>{blok?.name}</h3>
        <p>{blok?.location}</p>
      </div>
      <div className="rating my-3"> {renderStars(blok?.rating)} </div>
      <div
        className={`review_description [&>p]:text-base [&>p]:leading-[30px] [&>p]:text-[#fff]`}
      >
        {render(blok?.description)}
      </div>
    </div>
  );
}
