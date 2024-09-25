import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const items = [
  "Roofing Contractors",
  "Electricians Companies",
  "Pool Repair Services",
  "Pest Control Services",
  "Landscaping Services",
  "Home Cleaning Services",
];

const Container = ({ blok }) => {
  // console.log("container", blok);

  // const tableOfContent = blok.content[0]?.component === "tableOfContent";
  const full_width = blok.full_width === true;

  return (
    <div
      className={`relative fluid-layout md:w-6/12 mb-10 mt-5 lg:mt-2 m-auto ${
        full_width ? "md:w-full" : ""
      }`}
      {...storyblokEditable(blok)}
    >
      {blok.content.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};
export default Container;
