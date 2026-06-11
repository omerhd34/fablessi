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
 categoryGroup: { select: { id: true, name: true, slug: true } },
 images: { orderBy: { sortOrder: "asc" } },
};

export async function GET(_request, { params }) {
 try {
  await requireAdmin();
  const { id } = await params;

  const product = await prisma.product.findUnique({
   where: { id },
   include: productInclude,
  });

  if (!product) {
   return Response.json({ error: "Ürün bulunamadı" }, { status: 404 });
  }

  return Response.json({
   ...product,
   widthCm: product.widthCm != null ? Number(product.widthCm) : null,
   heightCm: product.heightCm != null ? Number(product.heightCm) : null,
   depthCm: product.depthCm != null ? Number(product.depthCm) : null,
   dimensionItems: Array.isArray(product.dimensionItems)
    ? product.dimensionItems.map((item) => ({
     ...item,
     widthCm: item.widthCm != null ? Number(item.widthCm) : null,
     depthCm: item.depthCm != null ? Number(item.depthCm) : null,
     heightCm: item.heightCm != null ? Number(item.heightCm) : null,
     amount: item.amount != null ? Number(item.amount) : null,
     quantity: item.quantity != null ? Number(item.quantity) : null,
    }))
    : [],
  });
 } catch (error) {
  return handleAdminError(error);
 }
}

export async function PUT(request, { params }) {
 try {
  await requireAdmin();
  const { id } = await params;
  const body = await request.json();

  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) {
   return Response.json({ error: "Ürün bulunamadı." }, { status: 404 });
  }

  const name = body.name?.trim() ?? existing.name;
  const slug = slugify(name) || existing.slug;
  if (slug !== existing.slug) {
   const conflict = await prisma.product.findUnique({ where: { slug } });
   if (conflict) {
    return Response.json({ error: "Bu slug zaten kullanılıyor." }, { status: 409 });
   }
  }
  const nameEn = body.nameEn?.trim() || null;

  const nameError = validateAdminName(name, "Ad (TR)");
  if (nameError) {
   return Response.json({ error: nameError }, { status: 400 });
  }

  const nameEnError = validateAdminNameEn(nameEn);
  if (nameEnError) {
   return Response.json({ error: nameEnError }, { status: 400 });
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

  const categoryGroupId =
   body.categoryGroupId !== undefined
    ? body.categoryGroupId?.trim() || null
    : existing.categoryGroupId;
  if (categoryGroupId) {
   const categoryGroup = await prisma.productCategoryGroup.findUnique({
    where: { id: categoryGroupId },
   });
   if (!categoryGroup) {
    return Response.json({ error: "Kategori grubu bulunamadı." }, { status: 400 });
   }
  }

  const isFeatured = body.isFeatured ?? existing.isFeatured;
  const featuredLimitError = await getFeaturedLimitError({
   isFeatured,
   excludeProductId: id,
  });
  if (featuredLimitError) {
   return Response.json({ error: featuredLimitError }, { status: 400 });
  }

  const product = await prisma.$transaction(async (tx) => {
   await tx.image.deleteMany({ where: { productId: id } });

   return tx.product.update({
    where: { id },
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
     sortOrder: Number(body.sortOrder) ?? existing.sortOrder,
     isPublished: body.isPublished ?? existing.isPublished,
     isFeatured,
     featuredOrder: Number(body.featuredOrder) ?? existing.featuredOrder,
     collectionId: body.collectionId ?? existing.collectionId,
     categoryGroupId,
     material: media.material,
     materialEn: media.materialEn,
     sku: media.sku,
     images: media.images,
    },
    include: productInclude,
   });
  });

  return Response.json(product);
 } catch (error) {
  return handleAdminError(error);
 }
}

export async function DELETE(_request, { params }) {
 try {
  await requireAdmin();
  const { id } = await params;

  await prisma.product.delete({ where: { id } });
  return Response.json({ ok: true });
 } catch (error) {
  return handleAdminError(error);
 }
}
