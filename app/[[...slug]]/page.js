import { getAllStory, getLinks } from "@/utils/storyblok";
import { getStoryblokApi } from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";
import {
  ArticleJsonLd,
  FAQPageJsonLd,
  LogoJsonLd,
  WebPageJsonLd,
  LocalBusinessJsonLd,
} from "next-seo";
import { storyblokEditable } from "@storyblok/react";

export const dynamicParams = true;

async function fetchData(params) {
  let slug = params.slug ? params.slug.join("/") : "home";

  const story = await getAllStory(slug);
  return {
    story: story ?? false,
  };
}

function getSchemaForStory(story) {
  const baseUrl = "https://localleads247.vercel.app/";

  switch (story?.content.component) {
    case "blog":
      return {
        type: "Article",
        url: `${baseUrl}/${story.full_slug}`,
        headline: story.content.title,
        description: story.content.description,
        image: story.content.image,
        author: {
          "@type": "Person",
          name: story.content.author?.name,
          description: story.content.author?.description,
          url: story.content.author?.url,
        },
        publisher: {
          "@type": "Organization",
          name: "LocalLeads247",
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/logo.png`,
          },
        },
        datePublished: story.first_published_at,
        dateModified: story.published_at,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/${story.full_slug}`,
        },
        keywords: story.content.keywords,
        articleSection: story.content.article_section,
        wordCount: story.content.word_count,
        about: story.content.about?.map((item) => ({
          "@type": "Thing",
          name: item.name,
          description: item.description,
          sameAs: item.sameAs,
        })),
        mentions: story.content.mentions?.map((item) => ({
          "@type": "Thing",
          name: item.name,
          sameAs: item.sameAs,
        })),
        isPartOf: {
          "@type": "Blog",
          name: "LocalLeads247 Blog",
          url: `${baseUrl}/blog`,
        },
        potentialAction: [
          {
            "@type": "ReadAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${baseUrl}/${story.full_slug}`,
            },
          },
          {
            "@type": "CommentAction",
            name: "Comment",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${baseUrl}/${story.full_slug}#comments`,
            },
          },
        ],
        citation: story.content.citations?.map((item) => ({
          "@type": "CreativeWork",
          name: item.name,
          url: item.url,
        })),
        discussionUrl: `${baseUrl}/forum/${story.slug}`,
        commentCount: story.content.comment_count,
        accessMode: ["textual", "visual"],
        accessModeSufficient: {
          "@type": "ItemList",
          itemListElement: ["textual,visual"],
        },
        accessibilityFeature: [
          "alternativeText",
          "readingOrder",
          "structuralNavigation",
          "tableOfContents",
        ],
        accessibilityHazard: [
          "noFlashingHazard",
          "noMotionSimulationHazard",
          "noSoundHazard",
        ],
        audience: {
          "@type": "Audience",
          audienceType: "Small Business Owners",
        },
        inLanguage: {
          "@type": "Language",
          name: "English",
          alternateName: "en",
        },
      };
    default:
      const schema = {
        type: "WebPage",
        url: `${baseUrl}/${story.full_slug}`,
        name: story.name,
        description: story.content.description || "Page description",
      };

      if (story.content && Array.isArray(story.content.body)) {
        schema.hasPart = story.content.body.map((component) => ({
          "@type": "WebPageElement",
          name: component?.section_name,
          description: component?.section_description,
        }));
      }
      return schema;
  }
}

export default async function Page({ params }) {
  const { story } = await fetchData(params);
  // console.log("story", story.content.body.map((item) => item.section_description));
  // const isBlogPage = story.content.component === "blog";
  const isReviewSection = story.content.component === "review_section";
  const isFAQComponent = story.name === "faq";
  const schema = getSchemaForStory(story);

  // story.content.body.map((item) => {
  //   item?.reviews?.map((review) => {
  //     console.log("review", review);
  //   });
  // })

  const dynamicReviews = story.content.body.map((item) => {
    return item?.reviews?.map((review) => ({
      author: review.name,
      datePublished: review.published_at || "Unknown Date", // Make sure to provide a valid date or a placeholder
      name: `Review by ${review.name}`,
      reviewBody: review.description?.content?.map((contentItem) => contentItem.text).join(" ") || "No review content provided", // Extract text from rich text object if available
      reviewRating: {
        ratingValue: review.rating,
        bestRating: "5",
        worstRating: "1",
      },
    })) || [];
  });


  return (
    <>
      <div className="min-h-screen">
        {/* <WebPageJsonLd useAppDir={true} {...schema} /> */}
        <LogoJsonLd
          useAppDir={true}
          logo="https://localleads247.vercel.app/img/local-leads-logo.svg"
          url="https://localleads247.vercel.app/"
        />
         <LocalBusinessJsonLd
          useAppDir={true}
          id="https://localleads247.vercel.app/"
          name="Local Leads 247"
          telephone="+14088717984"
          address={{
            streetAddress: "1600 Saratoga Ave",
            addressLocality: "San Jose",
            addressRegion: "CA",
            postalCode: "95129",
            addressCountry: "US",
          }}
          geo={{
            latitude: "37.293058",
            longitude: "-121.988331",
          }}
          rating={{
            ratingValue: "4.9",
            ratingCount: "100",
          }}
          review={dynamicReviews}
        />
        {isFAQComponent && (
          <FAQPageJsonLd
            useAppDir={true}
            mainEntity={story.content.body[0].content.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            }))}
          />
        )}

        {schema.type === "WebPage" && (
          <WebPageJsonLd useAppDir={true} {...schema} />
        )}
       
        <StoryblokStory story={story} full_slug={story?.full_slug} />
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const links = await getLinks();
  const paths = [];
  Object.keys(links).forEach((linkKey) => {
    if (links[linkKey].is_folder || links[linkKey].slug === "home") {
      return;
    }

    const slug = links[linkKey].slug;
    let splittedSlug = slug.split("/");
    paths.push({ slug: splittedSlug });
  });

  return paths;
}
