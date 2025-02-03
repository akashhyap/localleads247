import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { render } from "storyblok-rich-text-react-renderer";

const Pricing = ({ blok }) => {
  // console.log("Pricing", blok);

  return (
    <div
      {...storyblokEditable(blok)}
      className="relative px-5 mb-10 mt-5 lg:mt-2 max-w-6xl m-auto"
    >
      <div className="price_header pt-10 pb-10 text-center">
        <div className="mb-5"><span className="eyebrow_text">{blok.preTitle}</span></div>
        <h1 className="pt-2">{blok.title}</h1>
        <div className="mb-10">{render(blok?.description)}</div>
      </div>
      {blok.plans.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};
export default Pricing;
