import { prisma } from "@/lib/prisma";

async function fetchCollections() {
 return prisma.collection.findMany({
  where: { isPublished: true },
  orderBy: { sortOrder: "asc" },
  include: {
   _count: { select: { products: true } },
   products: {
    where: { isPublished: true },
    orderBy: { sortOrder: "asc" },
    take: 1,
    include: {
     images: {
      where: { isPrimary: true },
      take: 1,
     },
    },
   },
  },
 });
}

async function fetchLatestProducts() {
 return prisma.product.findMany({
  where: { isPublished: true },
  orderBy: { createdAt: "desc" },
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
}

async function fetchArchitectPicks() {
 return prisma.product.findMany({
  where: { isPublished: true },
  orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  take: 8,
  include: {
   collection: { select: { name: true, slug: true } },
   images: {
    orderBy: { sortOrder: "asc" },
    take: 1,
    where: { isPrimary: true },
   },
  },
 });
}

export async function getHomePageData() {
 try {
  const [collections, latestProducts, architectPicks] = await Promise.all([
   fetchCollections(),
   fetchLatestProducts(),
   fetchArchitectPicks(),
  ]);

  return { collections, latestProducts, architectPicks };
 } catch (error) {
  console.error("[getHomePageData]", error);
  return {
   collections: [],
   latestProducts: [],
   architectPicks: [],
  };
 }
}

export function getPrimaryImageUrl(product) {
 return product.images?.[0]?.url ?? null;
}
