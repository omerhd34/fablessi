import { clampAdminPartName, clampAdminText } from "@/lib/admin/field-limits";
import { parseTurkishAmount } from "@/lib/admin/price-input";

export function parseDimensionItems(items) {
 if (!Array.isArray(items)) return null;
 return items.map((item, index) => ({
  name: clampAdminPartName(item.name).trim() || null,
  nameEn: clampAdminPartName(item.nameEn).trim() || null,
  widthCm: item.widthCm != null && item.widthCm !== "" ? Number(item.widthCm) : null,
  depthCm: item.depthCm != null && item.depthCm !== "" ? Number(item.depthCm) : null,
  heightCm: item.heightCm != null && item.heightCm !== "" ? Number(item.heightCm) : null,
  amount: parseTurkishAmount(item.amount),
  quantity:
   item.quantity != null && item.quantity !== "" && Number(item.quantity) > 0
    ? Number(item.quantity)
    : 1,
  sortOrder: index,
 }));
}

export function validateProductImages(images) {
 if (!Array.isArray(images) || !images.some((image) => image.url?.trim())) {
  return "En az bir görsel gerekli.";
 }

 return null;
}

export function parseProductImages(images, productName, productNameEn) {
 if (!Array.isArray(images)) return [];
 return images
  .map((image, index) => ({
   url: image.url?.trim(),
   alt:
    image.alt?.trim() ||
    (index === 0 ? productName : `${productName} — görsel ${index + 1}`),
   altEn:
    image.altEn?.trim() ||
    (index === 0
     ? productNameEn || productName
     : `${productNameEn || productName} — image ${index + 1}`),
   sortOrder: index,
   isPrimary: Boolean(image.isPrimary) || index === 0,
  }))
  .filter((image) => image.url);
}

export function parseProductMedia(body, productSlug, productName, productNameEn) {
 const images = parseProductImages(body.images, productName, productNameEn);

 return {
  material: clampAdminText(body.material).trim() || null,
  materialEn: clampAdminText(body.materialEn).trim() || null,
  sku: body.sku?.trim() || productSlug.toUpperCase().replace(/-/g, ""),
  images: images.length ? { create: images } : undefined,
 };
}
