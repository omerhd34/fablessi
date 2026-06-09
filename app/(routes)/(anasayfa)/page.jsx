import { BrandExperienceBanner } from "@/components/home/brand-experience-banner";
import { CategoriesShowcase } from "@/components/home/categories-showcase";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProductsGrid } from "@/components/home/featured-products-grid";
import { getHomePageData } from "@/lib/queries/home";

export const revalidate = 60;

export default async function Anasayfa() {
 const { featuredProducts } = await getHomePageData();

 return (
  <>
   <HeroSection />
   <CategoriesShowcase />
   <FeaturedProductsGrid products={featuredProducts} />
   <BrandExperienceBanner />
  </>
 );
}
