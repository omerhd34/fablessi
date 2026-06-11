import {
 validateAdminName,
 validateAdminNameEn,
 validateDimensionItemsText,
 validateProductMaterials,
} from "@/lib/admin/field-limits";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/admin/slug";
import { getFeaturedLimitError } from "@/lib/admin/featured-products";
import {
 parseDimensionItems,
 parseProductMedia,
 validateProductImages,
} from "@/lib/admin/product-payload";
import { requireAdmin, handleAdminError } from "@/lib/admin/require-admin";

const productInclude = {
 collection: { select: { id: true, name: true, slug: true } },
 images: { orderBy: { sortOrder: "asc" } },
};

export async function GET() {
 try {
  await requireAdmin();

  const products = await prisma.product.findMany({
   orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
   include: {
    collection: { select: { id: true, name: true, slug: true } },
    _count: { select: { images: true } },
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
  const nameEn = body.nameEn?.trim();

  const nameError = validateAdminName(name, "Ad (TR)");
  if (nameError) {
   return Response.json({ error: nameError }, { status: 400 });
  }

  const nameEnError = validateAdminNameEn(nameEn);
  if (nameEnError) {
   return Response.json({ error: nameEnError }, { status: 400 });
  }

  const slug = slugify(name);
  if (!slug || !body.collectionId) {
   return Response.json(
    { error: "Ad ve koleksiyon gereklidir." },
    { status: 400 }
   );
  }

  const existing = await prisma.product.findUnique({ where: { slug } });
  if (existing) {
   return Response.json({ error: "Bu slug zaten kullanılıyor." }, { status: 409 });
  }

  const collection = await prisma.collection.findUnique({
   where: { id: body.collectionId },
  });
  if (!collection) {
   return Response.json({ error: "Koleksiyon bulunamadı." }, { status: 400 });
  }

  const categoryGroupId = body.categoryGroupId?.trim() || null;
  if (categoryGroupId) {
   const categoryGroup = await prisma.productCategoryGroup.findUnique({
    where: { id: categoryGroupId },
   });
   if (!categoryGroup) {
    return Response.json({ error: "Kategori grubu bulunamadı." }, { status: 400 });
   }
  }

  const imageError = validateProductImages(body.images);
  if (imageError) {
   return Response.json({ error: imageError }, { status: 400 });
  }

  const materialError = validateProductMaterials(body.material, body.materialEn);
  if (materialError) {
   return Response.json({ error: materialError }, { status: 400 });
  }

  const dimensionItemsError = validateDimensionItemsText(body.dimensionItems);
  if (dimensionItemsError) {
   return Response.json({ error: dimensionItemsError }, { status: 400 });
  }

  const media = parseProductMedia(body, slug, name, nameEn);

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
    dimensions: null,
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
    material: media.material,
    materialEn: media.materialEn,
    sku: media.sku,
    images: media.images,
   },
   include: productInclude,
  });

  return Response.json(product, { status: 201 });
 } catch (error) {
  return handleAdminError(error);
 }
}
