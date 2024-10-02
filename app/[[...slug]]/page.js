import { getAllStory, getLinks } from "@/utils/storyblok";
import { getStoryblokApi } from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";
import { ArticleJsonLd } from "next-seo";

export const dynamicParams = true;

async function fetchData(params) {
  let slug = params.slug ? params.slug.join('/') : 'home'

  const story = await getAllStory(slug)
  return {
    story: story ?? false
  }
}

export default async function Page({ params }) {
  const { story } = await fetchData(params);
  const isBlogPage = story.content.component === "blog";
  return (
    <>
      <div className="min-h-screen">
       <StoryblokStory story={story} full_slug={story?.full_slug} />
      </div>
    </>
  );
}


export async function generateStaticParams() {
  const links = await getLinks()
  const paths = [];
  Object.keys(links).forEach((linkKey) => {
    if (links[linkKey].is_folder || links[linkKey].slug === 'home') {
      return
    }

    const slug = links[linkKey].slug
    let splittedSlug = slug.split('/')
    paths.push({ slug: splittedSlug })
  })

  return paths
}
