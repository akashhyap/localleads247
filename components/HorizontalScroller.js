import React, { useRef, useEffect, useState } from "react";
import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

const HorizontalScroller = ({ blok }) => {
  const scrollerRef = useRef(null);
  const contentRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const content = contentRef.current;
    if (!scroller || !content || !blok?.content) return;

    // Clone the content to create a seamless loop
    const cloneItems = () => {
      const items = Array.from(content.children);
      items.forEach(item => content.appendChild(item.cloneNode(true)));
    };
    cloneItems();

    let scrollInterval;
    const startScroll = () => {
      scrollInterval = setInterval(() => {
        scroller.scrollLeft += 1;
        if (scroller.scrollLeft >= content.scrollWidth / 2) {
          scroller.scrollLeft = 0;
        }
      }, 20); // Adjust this value to change scroll speed
    };

    const stopScroll = () => {
      clearInterval(scrollInterval);
    };

    startScroll();

    scroller.addEventListener('mouseenter', stopScroll);
    scroller.addEventListener('mouseleave', startScroll);

    return () => {
      clearInterval(scrollInterval);
      scroller.removeEventListener('mouseenter', stopScroll);
      scroller.removeEventListener('mouseleave', startScroll);
    };
  }, [blok]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollerRef.current.offsetLeft);
    setScrollLeft(scrollerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="relative overflow-hidden bg-[#35384b] py-5">
      <div
        ref={scrollerRef}
        className="scroller select-none"
        style={{
          width: '100%',
          overflowX: 'auto',
          overflowY: 'hidden',
          whiteSpace: 'nowrap',
          cursor: 'grab',
          userSelect: 'none',
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        {...storyblokEditable(blok)}
      >
        <div
          ref={contentRef}
          className="flex items-center"
          style={{
            display: 'flex',
            whiteSpace: 'nowrap',
          }}
        >
          {blok?.content?.map((nestedBlok) => (
            <div key={nestedBlok._uid} className="inline-block">
              <StoryblokComponent blok={nestedBlok} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroller;