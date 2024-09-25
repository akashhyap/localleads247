import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";

const BrandList = ({ blok }) => {
  return (
    <figure className="w-56 relative select-none" {...storyblokEditable(blok)}>
      {blok?.items?.filename && (
        <Image
          alt={blok.items.alt || "Brand logo"}
          src={`${blok.items.filename}/m/`}
          width={200}
          height={200}
          className="object-contain object-center pointer-events-none"
          loading="lazy"
          draggable="false"
        />
      )}
    </figure>
  );
};

export default BrandList;