import { productCategorySlugs } from "@/lib/navigation";
import { prisma } from "@/lib/prisma";
import { serializeProduct } from "@/lib/product-utils";

const productListInclude = {
 collection: { select: { name: true, slug: true } },
 variants: {
  select: { color: true, material: true, isDefault: true },
  orderBy: { sortOrder: "asc" },
 },
 images: {
  where: { isPrimary: true },
  take: 1,
  orderBy: { sortOrder: "asc" },
 },
};

const productDetailInclude = {
 collection: { select: { name: true, slug: true, description: true } },
 variants: { orderBy: { sortOrder: "asc" } },
 images: { orderBy: { sortOrder: "asc" } },
};

export async function getProductBySlug(slug) {
 try {
  const product = await prisma.product.findFirst({
   where: { slug, isPublished: true },
   include: productDetailInclude,
  });

  return serializeProduct(product);
 } catch (error) {
  console.error("[getProductBySlug]", error);
  return null;
 }
}

export async function getCategoryRelatedProducts(productSlug, limit = 6) {
 const categorySlug = Object.keys(productCategorySlugs).find((slug) =>
  productCategorySlugs[slug].includes(productSlug)
 );

 if (!categorySlug) return [];

 const relatedSlugs = productCategorySlugs[categorySlug].filter(
  (slug) => slug !== productSlug
 );

 if (!relatedSlugs.length) return [];

 try {
  const products = await prisma.product.findMany({
   where: {
    isPublished: true,
    slug: { in: relatedSlugs },
   },
   orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
   take: limit,
   include: productListInclude,
  });

  return products.map(serializeProduct);
 } catch (error) {
  console.error("[getCategoryRelatedProducts]", error);
  return [];
 }
}

export async function getPublishedProducts(categorySlug = null) {
 const slugs =
  categorySlug && productCategorySlugs[categorySlug]
   ? productCategorySlugs[categorySlug]
   : null;

 try {
  const products = await prisma.product.findMany({
   where: {
    isPublished: true,
    ...(slugs?.length ? { slug: { in: slugs } } : {}),
   },
   orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
   include: productListInclude,
  });

  return products.map(serializeProduct);
 } catch (error) {
  console.error("[getPublishedProducts]", error);
  return [];
 }
}
