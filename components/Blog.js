import ArticleHeader from "./ArticleHeader";
import ArticleBody from "./ArticleBody";
import { TOCProvider } from "@/hooks/toc";

const Blog = ({blok,full_slug}) => {
  return (
    <TOCProvider>
      <ArticleHeader blok={blok} full_slug={full_slug} />
      <ArticleBody blok={blok} />
    </TOCProvider>
  );
};
export default Blog;
