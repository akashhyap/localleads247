import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";

const Faq = ({ blok }) => {
  const addedClasses = {
    marginTop: blok?.marginTop,
    marginBottom: blok?.marginBottom,
  };
  return (
    <div className="relative container max-w-5xl mx-auto py-16 px-7" style={addedClasses} {...storyblokEditable(blok)}>
      {blok?.content?.map((nestedBlok) => (
        <StoryblokComponent
          blok={nestedBlok}
          key={nestedBlok._uid}
          itemIdx={nestedBlok._uid}
        />
      ))}
    </div>
  );
};

export default Faq;