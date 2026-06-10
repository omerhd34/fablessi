import { prisma } from "@/lib/prisma";

export const MAX_FEATURED_PRODUCTS = 4;

export async function getFeaturedProductCount(excludeProductId) {
 return prisma.product.count({
  where: {
   isFeatured: true,
   ...(excludeProductId ? { NOT: { id: excludeProductId } } : {}),
  },
 });
}

export async function getFeaturedLimitError({ isFeatured, excludeProductId }) {
 if (!isFeatured) return null;

 const count = await getFeaturedProductCount(excludeProductId);
 if (count >= MAX_FEATURED_PRODUCTS) {
  return `Anasayfa vitrininde en fazla ${MAX_FEATURED_PRODUCTS} ürün olabilir.`;
 }

 return null;
}
