import { storyblokEditable,StoryblokComponent } from "@storyblok/react/rsc";

const SubmenuLink = ({ blok }) => {

  return (
    <div>
      <span>
        {blok?.name}
      </span>
    </div>
  );
};
export default SubmenuLink;
