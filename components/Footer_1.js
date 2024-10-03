"use client";
import { StoryblokComponent } from "@storyblok/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { render } from "storyblok-rich-text-react-renderer";

const Footer_1 = ({ blok }) => {
  // console.log("footer", blok);
  return (
    <div className="footer_section col-span-full lg:col-span-1">
      <div className="relative">
        <Link href="/"><Image src={blok?.footer_logo.filename} alt="" width={250} height={150} /></Link>
      </div>
    </div>
  );
};

export default Footer_1;
