import { prisma } from "@/lib/prisma";

function toNumber(value) {
 return value != null ? Number(value) : null;
}

function serializeAdminProduct(product) {
 return {
  ...product,
  widthCm: toNumber(product.widthCm),
  heightCm: toNumber(product.heightCm),
  depthCm: toNumber(product.depthCm),
  dimensionItems: Array.isArray(product.dimensionItems)
   ? product.dimensionItems.map((item) => ({
      ...item,
      widthCm: toNumber(item.widthCm),
      depthCm: toNumber(item.depthCm),
      heightCm: toNumber(item.heightCm),
      amount: toNumber(item.amount),
      quantity: toNumber(item.quantity),
     }))
   : [],
 };
}

const productAdminInclude = {
 collection: { select: { id: true, name: true, slug: true } },
 categoryGroup: { select: { id: true, name: true, slug: true } },
 variants: {
  orderBy: { sortOrder: "asc" },
  include: {
   images: { orderBy: { sortOrder: "asc" } },
  },
 },
};

export async function getAdminStats() {
 const [collections, categoryGroups, products, variants, images] = await Promise.all([
  prisma.collection.count(),
  prisma.productCategoryGroup.count(),
  prisma.product.count(),
  prisma.variant.count(),
  prisma.image.count(),
 ]);

 return { collections, categoryGroups, products, variants, images };
}

export async function getAdminCollections() {
 return prisma.collection.findMany({
  orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  include: { _count: { select: { products: true } } },
 });
}

export async function getAdminCollection(id) {
 return prisma.collection.findUnique({
  where: { id },
  include: {
   products: {
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    select: { id: true, name: true, slug: true, isPublished: true },
   },
  },
 });
}

export async function getAdminCategoryGroups() {
 return prisma.productCategoryGroup.findMany({
  orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  include: { _count: { select: { products: true } } },
 });
}

export async function getAdminCategoryGroup(id) {
 return prisma.productCategoryGroup.findUnique({
  where: { id },
  include: {
   products: {
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    select: { id: true, name: true, slug: true, isPublished: true },
   },
  },
 });
}

export async function getAdminProducts() {
 const products = await prisma.product.findMany({
  orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  include: {
   collection: { select: { id: true, name: true, slug: true } },
   categoryGroup: { select: { id: true, name: true, slug: true } },
   _count: { select: { variants: true } },
  },
 });

 return products.map(serializeAdminProduct);
}

export async function getAdminProduct(id) {
 const product = await prisma.product.findUnique({
  where: { id },
  include: productAdminInclude,
 });

 if (!product) return null;

 return serializeAdminProduct(product);
}

export async function getCollectionOptions() {
 return prisma.collection.findMany({
  orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  select: { id: true, name: true, slug: true },
 });
}

export async function getCategoryGroupOptions() {
 return prisma.productCategoryGroup.findMany({
  orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  select: { id: true, name: true, slug: true },
 });
}
