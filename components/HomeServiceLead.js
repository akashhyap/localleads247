import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { render } from "storyblok-rich-text-react-renderer";

export default function HomeServiceLead({ blok }) {
  // console.log("HomeServiceLead", blok);

  return (
    <section
      className="bg-[#e5e5e5] pt-16 lg:pt-24 px-4 home_service"
      {...storyblokEditable(blok)}
    >
      <div className="fluid_container container grid grid-cols-12 lg:items-center">
        {/* Left Text Section */}
        <div className="homeservice_description col-span-full 2xl:col-span-5 text-center lg:text-left 2xl:max-w-lg">
          {render(blok?.description)}
        </div>

        {/* Center Image Section */}
        <div className="col-span-full lg:col-span-6 2xl:col-span-4 order-3 lg:order-2 h-full w-full lg:w-auto flex justify-end">
          <div className="relative w-full aspect-h-9 aspect-w-16">
            {blok?.image.filename && (
              <Image
                src={`${blok.image.filename}/m/`}
                alt="Man Placeholder"
                fill
                className="object-contain"
              />
            )}
          </div>
        </div>

        {/* Right Text Section */}
        <div className="homeservice_rt_content col-span-full lg:col-span-6 2xl:col-span-3 order-2 lg:order-3 mb-16">
          {render(blok?.content)}
          <a
            href={blok?.button_link.cached_url}
            className="primary_btn banner1_btn_solid_big"
          >
            {blok?.button_label}
          </a>
        </div>
      </div>
    </section>
  );
}
