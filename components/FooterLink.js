import Link from "next/link";

const FooterLink = ({ blok }) => {
  return (
    <Link
      href={`/${blok.link.cached_url}`}>
      {blok.name}
    </Link>
  );
};

export default FooterLink;
