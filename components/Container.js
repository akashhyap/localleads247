import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const Container = ({ blok }) => {
  // console.log("container", blok);

  // const tableOfContent = blok.content[0]?.component === "tableOfContent";
  const full_width = blok.full_width === true;

  return (
    <div
      className={`relative fluid-layout lg:w-6/12 mb-10 mt-5 lg:mt-2 m-auto ${
        full_width ? "lg:w-full" : ""
      } bg-[${blok?.bg_color?.color}]`}
      {...storyblokEditable(blok)}
      style={{paddingTop: blok?.padding_top, paddingBottom: blok?.padding_bottom}}
    >
      {blok.content.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};
export default Container;
