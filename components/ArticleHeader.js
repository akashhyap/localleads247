"use client"
import { StoryblokComponent, storyblokEditable } from "@storyblok/react/rsc";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTOC } from "@/hooks/toc";


const ArticleHeader = ({ blok, full_slug }) => {
  let prevLink = full_slug.split("/")[0];
  let prevLinkLabel = full_slug.split("/")[0].split("-").join(" ");

  const [headerStyle, setHeaderStyle] = useState("");
  const [lastScrollY, setLastScrollY] = useState(0);

  // Function to update the header style based on scroll position
  const scrollHeader = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY === 0) {
      setHeaderStyle("visible show_header");
    } else if (currentScrollY > lastScrollY && currentScrollY > 20) {
      // Scrolling down
      setHeaderStyle("invisible hide_header");
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up
      setHeaderStyle("visible scrolling");
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHeader);

    return () => {
      window.removeEventListener("scroll", scrollHeader);
    };
  }, [lastScrollY]);

  const { toggleTOC } = useTOC();

  return (
    <>
      <div className={`${headerStyle} header-transition in-article md:hidden`} onClick={toggleTOC}>
        <span>In this Article</span>
        <span className="dnw__arrow"></span>
      </div>

      <div
        className="article_header relative pt-5 pb-0 md:pb-12 md:py-16"
        {...storyblokEditable(blok)}
      >
        <div className="w-full text-xs px-7">
          <div className="pb-8 pt-3 md:pt-0">
            <ol
              className="font-sans flex items-center justify-center whitespace-nowrap min-w-0"
              aria-label="Breadcrumb"
            >
              <li className="group">
                <Link href="/" legacyBehavior>
                  <a className="flex items-center underline underline-offset-4 group-hover:text-saffron">
                    <svg
                      className="flex-shrink-0 mr-3 h-4 w-4 group-hover:text-saffron"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                      />
                    </svg>
                    Home
                    <svg
                      className="flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </a>
                </Link>
              </li>
              <li className="group">
                <Link href={`/${prevLink}/`} legacyBehavior>
                  <a className="flex items-center underline underline-offset-4 group-hover:text-saffron capitalize">
                    {prevLink}
                    <svg
                      className="flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </a>
                </Link>
              </li>
              <li className="truncate" aria-current="page">
                {blok?.body && blok?.body[0]?.text}
              </li>
            </ol>
          </div>
          {blok?.body?.map((nestedBlok) => {
            const isTitle = nestedBlok.component == "h1_title";
            const isBlogAuthorInfo = nestedBlok.component == "blogAuthorInfo";
            const isFeaturedImage = nestedBlok.component == "featuredImage";
            const header =
              isTitle || isBlogAuthorInfo || isFeaturedImage ? (
                <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
              ) : null;
            return header;
          })}
        </div>
      </div>
      {/* <div className="relative hidden md:block">
        <div className="absolute -bottom-[1px] -left-[4px] right-0 z-10 shape">
          <svg
            width="3000"
            height="600"
            viewBox="0 0 3000 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <path d="M0 600H3000V0L0 600Z" fill="#fff"></path>
          </svg>
        </div>
      </div> */}
    </>
  );
};
export default ArticleHeader;
