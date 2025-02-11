/** 1. Tag it as client component */
"use client";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import dynamic from 'next/dynamic'

/** 2. Import your components */
import Config from "./Config";
import Page from "./Page";
import Teaser from "./Teaser";
import Container from "./Container";
import Heading from "./Heading";
import Content from "./Content";
import BannerSimple from "./BannerSimple";

import ListContent from "./ListContent";
import HorizontalScroller from "./HorizontalScroller";
import BrandList from "./BrandList";
import FooterLink from "./FooterLink";
import MarketingFunnel from "./MarketingFunnel";
import MenuLink from "./MenuLink";
import HomeServiceLead from "./HomeServiceLead";
import ReviewSection from "./ReviewSection";
import Reviews from "./Reviews";
import SubmenuLink from "./SubmenuLink";
import ImageTextSplit from "./ImageTextSplit";
import Grid from "./Grid";
import InnerGrid from "./InnerGrid";
import SimpleContentGrid from "./SimpleContentGrid";
import Faq from "./Faq";
import FaqContent from "./FaqContent";
import Footer_1 from "./Footer_1";
import FooterColumn from "./FooterColumn";
import Contact from "./Contact";
import Images from "./Images";
import Pricing from "./Pricing";
import PriceCategory from "./PriceCategory";
import PriceLevel from "./PriceLevel";
// import HtmlElements from "./HtmlElements";
// import TitleH1 from "./TitleH1";
// import Insights from "./Insights";
// import InsightsCard from "./InsightsCard";
// import Blog from "./Blog";
// import FeaturedImage from "./FeaturedImage";
// import BlogAuthorInfo from "./BlogAuthorInfo";
// import BlogTeaser from "./BlogTeaser";
// import UsefulGuides from "./UsefulGuides";
// import DogBreeds from "./DogBreeds";
// import FluidLayout from "./FluidLayout";
// import TableOfContent from "./TableOfContent";
// import ArticleLists from "./ArticleLists";
// import Category from "./Category";
// import ImageOverlayCard from "./ImageOverlayCard";
// import CardItem from "./CardItem";
// import RelatedArticles from "./RelatedArticles";
// import ArticleContentArea from "./ArticleContentArea";
// import ContactForm from "./Contact";
// import SubscribeNewsletter from "./SubscribeNewsletter.js";
// import Diet from "./Diet";
// import Health from "./Health";
// import SmallDogs from "./SmallDogs";
// import BigDogs from "./BigDogs";
// import Products from "./Products";
// import SearchBar from "./SearchBar";


// Dynamic import for StickyContent with ssr disabled
const StickyContent = dynamic(() => import('./StickyContent'), {
  ssr: false
})

/** 3. Initialize it as usual */
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  bridge: true,
  components: {
    config: Config,
    page: Page,
    teaser: Teaser,
    container: Container,
    heading: Heading,
    content: Content,
    banner_simple: BannerSimple,
    sticky_content: StickyContent,
    list_content: ListContent,
    HorizontalScroller: HorizontalScroller,
    brand_list: BrandList,
    footer_link: FooterLink,
    marketing_funnel: MarketingFunnel,
    menu_link: MenuLink,
    submenu_link: SubmenuLink,
    home_service_lead: HomeServiceLead,
    review_section: ReviewSection,
    reviews: Reviews,
    "image-text-split": ImageTextSplit,
    grid: Grid,
    inner_grid: InnerGrid,
    simple_content_grid: SimpleContentGrid,
    faq: Faq,
    faq_content: FaqContent,
    footer_1: Footer_1,
    footer_column: FooterColumn,
    contact_us: Contact,
    images: Images,
    pricing: Pricing,
    priceCategory: PriceCategory,
    priceLevel: PriceLevel,
    // h1_title: TitleH1,
    // insights: Insights,
    // insightsCard: InsightsCard,
    // blog: Blog,
    // featuredImage: FeaturedImage,
    // blogAuthorInfo: BlogAuthorInfo,
    // blogTeaser: BlogTeaser,
    // "useful-guides": UsefulGuides,
    // "dog-breeds": DogBreeds,
    // fluidLayout: FluidLayout,

    // tableOfContent: TableOfContent,
    // "article-lists": ArticleLists,
    // category: Category,
    // "image-overlay-card": ImageOverlayCard,
    // "card-item": CardItem,
    // "related-articles": RelatedArticles,
    // config: Config,
    // "image-text-split": ImageTextSplit,
    // "article-content-area": ArticleContentArea,
    // contact: ContactForm,
    // subscribeNewsletter: SubscribeNewsletter,
    // diet: Diet,
    // health: Health,
    // "small-dogs": SmallDogs,
    // "big-dogs": BigDogs,
    // products: Products,
    
    // htmlElements: HtmlElements,
    // searchBar: SearchBar,
    // menu: Menu,
    // footer: Footer,
  },
});

export default function StoryblokProvider({ children }) {
  return children;
}
