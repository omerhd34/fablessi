import { defaultLocale } from "@/lib/i18n/config";
import { getLocalizedCollectionName } from "@/lib/i18n/display-names";
import { localizeProduct } from "@/lib/i18n/localize-product";
import { getCategoryLabelForProduct } from "@/lib/product-category";
import { catalogColorSwatches } from "@/lib/catalog-colors";

export function getCollectionProductsHref(collectionSlug) {
 return `/urunler?koleksiyon=${collectionSlug}`;
}

export function getPrimaryImageUrl(product) {
 return product.images?.[0]?.url ?? null;
}

function normalizeDimensionItem(item) {
 return {
  ...item,
  widthCm: item.widthCm != null ? Number(item.widthCm) : null,
  depthCm: item.depthCm != null ? Number(item.depthCm) : null,
  heightCm: item.heightCm != null ? Number(item.heightCm) : null,
 };
}

export function getDimensionItems(product) {
 if (Array.isArray(product?.dimensionItems) && product.dimensionItems.length > 0) {
  return product.dimensionItems.map(normalizeDimensionItem);
 }

 if (
  product?.widthCm != null ||
  product?.depthCm != null ||
  product?.heightCm != null
 ) {
  return [
   normalizeDimensionItem({
    widthCm: product.widthCm,
    depthCm: product.depthCm,
    heightCm: product.heightCm,
   }),
  ];
 }

 return [];
}

export function serializeProduct(product, locale = defaultLocale) {
 if (!product) return product;

 return localizeProduct(
  {
   ...product,
   widthCm: product.widthCm != null ? Number(product.widthCm) : null,
   heightCm: product.heightCm != null ? Number(product.heightCm) : null,
   depthCm: product.depthCm != null ? Number(product.depthCm) : null,
   dimensionItems: Array.isArray(product.dimensionItems)
    ? product.dimensionItems.map(normalizeDimensionItem)
    : product.dimensionItems,
  },
  locale
 );
}

export function getProductCardLabel(product) {
 const collectionName = product.collection?.name?.trim();
 if (!collectionName) return product.name;

 const prefix = `${collectionName} `;
 if (product.name.startsWith(prefix)) {
  return product.name.slice(prefix.length).trim() || product.name;
 }

 return product.name;
}

export function getProductShortName(product) {
 return product.collection?.name ?? product.name;
}

export function getProductFavoriteToastLabel(product, dictionary) {
 const collectionName =
  getLocalizedCollectionName(product.collection, dictionary)?.trim() ??
  product.collection?.name?.trim();
 const categoryLabel = product.slug
  ? getCategoryLabelForProduct(product.slug, dictionary)
  : null;

 if (collectionName && categoryLabel) {
  return `${collectionName} - ${categoryLabel}`;
 }

 return collectionName ?? categoryLabel ?? product.name ?? null;
}

export function colorToImagePrefix(color) {
 if (!color) return null;
 return color.toLocaleLowerCase("tr");
}

export function getAlternateColorVariant(variants, selectedVariant) {
 const colorVariants = variants.filter((variant) => variant.color);

 if (colorVariants.length < 2) return null;

 return (
  colorVariants.find((variant) => variant.id !== selectedVariant?.id) ?? null
 );
}

export function getImagesForVariant(images, variant) {
 if (!variant?.color) return images;

 const prefix = colorToImagePrefix(variant.color);
 const filtered = images.filter((image) => {
  const fileName = image.url.split("/").pop()?.toLowerCase() ?? "";
  return fileName.startsWith(prefix);
 });

 return filtered.length > 0 ? filtered : images;
}

export function getColorSwatch(color) {
 return catalogColorSwatches[color] ?? "#d1d5db";
}

export function formatDimensions(product, t) {
 const items = getDimensionItems(product);

 if (items.length === 0) {
  return product.dimensions ?? null;
 }

 const widthLabel = t?.("product.dimensionWidthShort") ?? "G";
 const depthLabel = t?.("product.dimensionDepthShort") ?? "D";
 const heightLabel = t?.("product.dimensionHeightShort") ?? "Y";

 return items
  .map((item) => {
   const size = [item.widthCm, item.depthCm, item.heightCm]
    .filter((value) => value != null)
    .join(" x ");

   if (!size) return null;

   const sizeText = `${size} cm`;
   return item.name ? `${item.name}: ${sizeText}` : `${widthLabel} ${item.widthCm ?? "—"} · ${depthLabel} ${item.depthCm ?? "—"} · ${heightLabel} ${item.heightCm ?? "—"} cm`;
  })
  .filter(Boolean)
  .join(" · ");
}

export function getVariantDimensions(product, t) {
 return formatDimensions(product, t) ?? "—";
}
