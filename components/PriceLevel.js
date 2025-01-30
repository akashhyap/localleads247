import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { render } from "storyblok-rich-text-react-renderer";

const PriceLevel = ({ blok }) => {

  return (
    <div {...storyblokEditable(blok)} className="priceLevel bg-white shadow shadow-gray-200 rounded-xl p-8 mb-10 mt-5 lg:mt-2">
      <p className="text-lg">{blok.preTitle}</p>
      <p className="text-4xl font-bold mt-4 text-[#38b5fe]">{blok.price}</p>
      <p className="text-lg">{blok.priceTenure}</p>
      <div className="mt-5 [&>ul]:list-disc [&>ul]:pl-4 [&>ul]:text-lg [&>ul>li]:leading-relaxed [&>ul>li]:mb-3">{render(blok?.description)}</div>
    </div>
  );
};
export default PriceLevel;
