import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";

const FeaturedImage = ({ blok }) => {
  return (
    <div className="md:w-3/4 m-auto md:mt-14">
      <figure className="w-full z-20 relative" {...storyblokEditable(blok)}>
      {blok.image.filename && (
        <div className="relative aspect-w-16 aspect-h-10">
          <Image
            src={`${blok.image.filename}/m/`}
            alt={blok.image.alt}
            fill
            sizes="(min-width: 780px) calc(75vw - 52px), calc(100vw - 70px)"
            className="w-full h-full object-cover object-center rounded-2xl"
            priority={true}
          />
        </div>
      )}
    </figure>
    </div>
  );
};
export default FeaturedImage;
