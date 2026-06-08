import { prisma } from "@/lib/prisma";
import { serializeProduct } from "@/lib/product-utils";

async function fetchFeaturedProducts() {
 const products = await prisma.product.findMany({
  where: { isPublished: true, isFeatured: true },
  orderBy: { featuredOrder: "asc" },
  take: 4,
  include: {
   collection: { select: { name: true, slug: true } },
   images: {
    orderBy: { sortOrder: "asc" },
    take: 1,
    where: { isPrimary: true },
   },
  },
 });

 return products.map(serializeProduct);
}

export async function getHomePageData() {
 try {
  const featuredProducts = await fetchFeaturedProducts();

  return { featuredProducts };
 } catch (error) {
  console.error("[getHomePageData]", error);
  return {
   featuredProducts: [],
  };
 }
}

export function getPrimaryImageUrl(product) {
 return product.images?.[0]?.url ?? null;
}
