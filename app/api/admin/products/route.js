import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/admin/slug";
import { getFeaturedLimitError } from "@/lib/admin/featured-products";
import {
 parseDimensionItems,
 parseVariants,
} from "@/lib/admin/product-payload";
import { requireAdmin, handleAdminError } from "@/lib/admin/require-admin";

const variantInclude = {
 orderBy: { sortOrder: "asc" },
 include: {
  images: { orderBy: { sortOrder: "asc" } },
 },
};

export async function GET() {
 try {
  await requireAdmin();

  const products = await prisma.product.findMany({
   orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
   include: {
    collection: { select: { id: true, name: true, slug: true } },
    _count: { select: { variants: true } },
   },
  });

  return Response.json(products);
 } catch (error) {
  return handleAdminError(error);
 }
}

export async function POST(request) {
 try {
  await requireAdmin();
  const body = await request.json();

  const name = body.name?.trim();
  const nameEn = body.nameEn?.trim() || null;
  const slug = slugify(name);
  if (!slug || !name || !body.collectionId) {
   return Response.json(
    { error: "Ad ve koleksiyon gerekli" },
    { status: 400 }
   );
  }

  const existing = await prisma.product.findUnique({ where: { slug } });
  if (existing) {
   return Response.json({ error: "Bu slug zaten kullanılıyor" }, { status: 409 });
  }

  const collection = await prisma.collection.findUnique({
   where: { id: body.collectionId },
  });
  if (!collection) {
   return Response.json({ error: "Koleksiyon bulunamadı" }, { status: 400 });
  }

  const categoryGroupId = body.categoryGroupId?.trim() || null;
  if (categoryGroupId) {
   const categoryGroup = await prisma.productCategoryGroup.findUnique({
    where: { id: categoryGroupId },
   });
   if (!categoryGroup) {
    return Response.json({ error: "Kategori grubu bulunamadı" }, { status: 400 });
   }
  }

  const variants = parseVariants(body.variants, slug, name, nameEn);

  const isFeatured = Boolean(body.isFeatured);
  const featuredLimitError = await getFeaturedLimitError({ isFeatured });
  if (featuredLimitError) {
   return Response.json({ error: featuredLimitError }, { status: 400 });
  }

  const product = await prisma.product.create({
   data: {
    slug,
    name,
    nameEn,
    description: body.description?.trim() || null,
    descriptionEn: body.descriptionEn?.trim() || null,
    dimensions: body.dimensions?.trim() || null,
    dimensionItems: parseDimensionItems(body.dimensionItems),
    widthCm: body.widthCm != null && body.widthCm !== "" ? Number(body.widthCm) : null,
    depthCm: body.depthCm != null && body.depthCm !== "" ? Number(body.depthCm) : null,
    heightCm: body.heightCm != null && body.heightCm !== "" ? Number(body.heightCm) : null,
    sortOrder: Number(body.sortOrder) || 0,
    isPublished: body.isPublished !== false,
    isFeatured,
    featuredOrder: Number(body.featuredOrder) || 0,
    collectionId: body.collectionId,
    categoryGroupId,
    variants: variants.length ? { create: variants } : undefined,
   },
   include: {
    collection: { select: { id: true, name: true, slug: true } },
    variants: variantInclude,
   },
  });

  return Response.json(product, { status: 201 });
 } catch (error) {
  return handleAdminError(error);
 }
}
