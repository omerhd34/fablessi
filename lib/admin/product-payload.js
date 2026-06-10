import { isCssColorValue, normalizeColorValue } from "@/lib/color-value";

export function parseDimensionItems(items) {
 if (!Array.isArray(items)) return null;
 return items.map((item, index) => ({
  name: item.name?.trim() || null,
  nameEn: item.nameEn?.trim() || null,
  widthCm: item.widthCm != null && item.widthCm !== "" ? Number(item.widthCm) : null,
  depthCm: item.depthCm != null && item.depthCm !== "" ? Number(item.depthCm) : null,
  heightCm: item.heightCm != null && item.heightCm !== "" ? Number(item.heightCm) : null,
  amount: item.amount != null && item.amount !== "" ? Number(item.amount) : null,
  quantity:
   item.quantity != null && item.quantity !== "" && Number(item.quantity) > 0
    ? Number(item.quantity)
    : 1,
  sortOrder: index,
 }));
}

export function parseVariantImages(images, productName, productNameEn, variantName) {
 if (!Array.isArray(images)) return [];
 return images
  .map((image, index) => ({
   url: image.url?.trim(),
   alt:
    image.alt?.trim() ||
    (index === 0 ? `${productName} — ${variantName}` : `${productName} — ${variantName} ${index + 1}`),
   altEn:
    image.altEn?.trim() ||
    (index === 0
     ? `${productNameEn || productName} — ${variantName}`
     : `${productNameEn || productName} — ${variantName} ${index + 1}`),
   sortOrder: index,
   isPrimary: Boolean(image.isPrimary) || index === 0,
  }))
  .filter((image) => image.url);
}

export function parseVariants(variants, productSlug, productName, productNameEn) {
 if (!Array.isArray(variants)) return [];

 return variants.map((variant, index) => {
  const variantName = variant.name?.trim() || `Varyant ${index + 1}`;
  const images = parseVariantImages(
   variant.images,
   productName,
   productNameEn,
   variantName
  );

  return {
   name: variantName,
   nameEn: variant.nameEn?.trim() || null,
   color: variant.color?.trim()
    ? isCssColorValue(variant.color)
      ? normalizeColorValue(variant.color)
      : variant.color.trim()
    : null,
   material: variant.material?.trim() || null,
   materialEn: variant.materialEn?.trim() || null,
   sortOrder: index,
   isDefault: Boolean(variant.isDefault),
   sku:
    variant.sku?.trim() ||
    `${productSlug}-${index + 1}`.toUpperCase().replace(/-/g, ""),
   images: images.length ? { create: images } : undefined,
  };
 });
}
