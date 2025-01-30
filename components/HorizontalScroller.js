import React, { useRef, useEffect, useState } from "react";
import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

const HorizontalScroller = ({ blok }) => {
  const scrollerRef = useRef(null);
  const contentRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const initialX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const content = contentRef.current;
    if (!scroller || !content || !blok?.content) return;

    // Clone the content
    const items = Array.from(content.children);
    items.forEach(item => {
      const clone = item.cloneNode(true);
      content.appendChild(clone);
    });
  }, [blok]);

  const handleStart = (clientX) => {
    setIsMouseDown(true);
    setIsPaused(true);
    initialX.current = clientX;
    scrollLeft.current = scrollerRef.current.scrollLeft;
  };

  const handleMove = (clientX) => {
    if (!isMouseDown) return;
    const dx = clientX - initialX.current;
    scrollerRef.current.scrollLeft = scrollLeft.current - dx;
  };

  const handleEnd = () => {
    setIsMouseDown(false);
    setTimeout(() => setIsPaused(false), 100);
  };

  // Mouse event handlers
  const onMouseDown = (e) => handleStart(e.clientX);
  const onMouseMove = (e) => handleMove(e.clientX);
  const onMouseUp = handleEnd;
  const onMouseLeave = handleEnd;

  // Touch event handlers
  const onTouchStart = (e) => handleStart(e.touches[0].clientX);
  const onTouchMove = (e) => handleMove(e.touches[0].clientX);
  const onTouchEnd = handleEnd;

  return (
    <div className="relative overflow-hidden bg-[#35384b] py-5">
      <style jsx global>{`
        .scroller-container {
          overflow-x: scroll;
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
        }
        .scroller-container::-webkit-scrollbar {
          display: none;
        }
        .scroller-content {
          display: inline-flex;
          will-change: transform;
          animation: scroll 70s linear infinite;
          animation-play-state: running;
        }
        .scroller-content.paused {
          animation-play-state: paused;
        }
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
      <div
        ref={scrollerRef}
        className="scroller-container select-none"
        style={{
          cursor: isMouseDown ? 'grabbing' : 'grab',
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        {...storyblokEditable(blok)}
      >
        <div
          ref={contentRef}
          className={`scroller-content ${isPaused ? 'paused' : ''}`}
        >
          {blok?.content?.map((nestedBlok) => (
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroller;