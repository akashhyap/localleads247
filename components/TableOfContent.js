"use client"
import { useEffect, useState, useRef } from "react";
import { Link, animateScroll } from "react-scroll";
import { useTOC } from "@/hooks/toc";

function useHeadings() {
  const [headings, setHeadings] = useState([]);
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll("h2:not([class^='exclude-index'])")
    ).map((element) => element.textContent);
    setHeadings(elements);
  }, []);
  return headings;
}

const TableOfContent = () => {
  const { isTOCVisible, hideTOC } = useTOC();
  const headings = useHeadings();

  // Determine the CSS class based on isTOCVisible
  const tocClass = isTOCVisible ? '' : 'hidden-toc';

  return (
    <>
      {/* {isTOCVisible ? ( */}
      <div className={`table-of-content w-1/5 pt-4 ${tocClass}`}>
          <nav className="sticky top-5 font-sans bg-[rgba(0,0,0,0.04)] px-6 py-8 rounded-2xl">
            <p className="text-xl tracking-tighter font-black mb-4 hidden md:block">IN THIS ARTICLE</p>
            <ul className="list-decimal pl-4">
              {headings.map((heading) => {
                const ID = heading.toLowerCase().split(" ").join("-");
                return (
                  <li key={heading} className="mb-2 text-xs tracking-tight leading-5">
                    <Link
                      to={ID}
                      spy={true}
                      smooth={true}
                      duration={500}
                      className="index-link cursor-pointer transition-colors ease-in-out delay-100 hover:text-poppy-900"
                      onClick={hideTOC}
                    >
                      {heading}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      {/* ) : null} */}
    </>
  );
};
export default TableOfContent;
