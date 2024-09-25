import { storyblokEditable } from "@storyblok/react";
import React, { useEffect } from "react";
import { render } from "storyblok-rich-text-react-renderer";

const Heading = ({ blok }) => {
  // console.log(blok);
  const HeadingTag = blok?.h_tag || "p";
  const [content, setContent] = React.useState(null);

  useEffect(() => {
    if (blok.text) {
      setContent(render(blok.text));
    }
  }, [blok.text]);
  return (
    <div
      className={`${blok?.max_width} ${
        blok?.max_width ? "mx-auto" : ""
      } md:text-lg`}
      {...storyblokEditable(blok)}
    >
      {React.createElement(
        HeadingTag,
        {
          className: "h1_style",
          ...storyblokEditable(blok),
        },
        content
      )}
    </div>
  );
};

export default Heading;
