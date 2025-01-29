import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { render } from "storyblok-rich-text-react-renderer";

const PriceLevel = ({ blok }) => {

  return (
    <div {...storyblokEditable(blok)} className="priceLevel bg-white rounded-xl p-8 mb-10 mt-5 lg:mt-2">
      <p>{blok.preTitle}</p>
      <p className="text-4xl font-bold mt-4">{blok.price}</p>
      <p>{blok.priceTenure}</p>
      <div className="mt-5 [&>ul]:list-disc [&>ul]:text-lg [&>ul>li]:leading-relaxed [&>ul>li]:mb-3">{render(blok?.description)}</div>
    </div>
  );
};
export default PriceLevel;
