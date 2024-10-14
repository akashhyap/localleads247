import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";

const Images = ({ blok }) => {
  return (
    <>
      {blok?.image.filename && (
        <Image
          alt={blok.image.alt}
          src={`${blok.image.filename}/m/`}
          width={50}
          height={50}
          loading="lazy"
        />
      )}
    </>
  );
};
export default Images;
