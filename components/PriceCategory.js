import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { render } from "storyblok-rich-text-react-renderer";

const Pricing = ({ blok }) => {

  return (
    <div {...storyblokEditable(blok)} className="relative mb-10 mt-5 lg:mt-2">
      <div><span className="eyebrow_text">{blok.preTitle}</span></div>
      <h2>{blok.title}</h2>
      <div className="priceLevels grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blok.priceLevels.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </div>
    </div>
  );
};
export default Pricing;