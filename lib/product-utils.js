import { catalogColorSwatches } from "@/lib/catalog-colors";

export function getCollectionProductsHref(collectionSlug) {
 return `/urunler?koleksiyon=${collectionSlug}`;
}

export function serializeProduct(product) {
 if (!product) return product;

 return {
  ...product,
  widthCm: product.widthCm != null ? Number(product.widthCm) : null,
  heightCm: product.heightCm != null ? Number(product.heightCm) : null,
  depthCm: product.depthCm != null ? Number(product.depthCm) : null,
 };
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

export function getDimensionLabels(product) {
 const labels = [];

 if (product.widthCm) {
  labels.push({
   key: "width",
   label: "Genişlik",
   value: `${Number(product.widthCm)} cm`,
  });
 }

 if (product.depthCm) {
  labels.push({
   key: "depth",
   label: "Derinlik",
   value: `${Number(product.depthCm)} cm`,
  });
 }

 if (product.heightCm) {
  labels.push({
   key: "height",
   label: "Yükseklik",
   value: `${Number(product.heightCm)} cm`,
  });
 }

 if (labels.length > 0) return labels;

 if (product.dimensions) {
  return [{ key: "dimensions", label: null, value: product.dimensions }];
 }

 return [];
}

export function formatDimensions(product) {
 const labels = getDimensionLabels(product);

 if (labels.length > 0) {
  return labels
   .map((item) => (item.label ? `${item.label}: ${item.value}` : item.value))
   .join(" - ");
 }

 return null;
}

export function getVariantDimensions(product) {
 return formatDimensions(product) ?? "—";
}

export function getProductMoreInfo(product) {
 const paragraphs = [];

 if (product.description) {
  paragraphs.push(product.description);
 }

 if (product.collection?.description) {
  paragraphs.push(product.collection.description);
 }

 paragraphs.push(
  "Fablessi ürünleri, dış mekân koşullarına dayanıklı malzemeler ve uzun ömürlü kullanım için seçilmiş kumaş ve iskelet detaylarıyla üretilir. Teras, bahçe ve havuz kenarı gibi alanlarda yıl boyu konforlu kullanım sunar."
 );

 paragraphs.push(
  "Ürün görselleri temsilidir; renk ve doku farklılıkları ekran ayarlarına göre değişebilir. Proje bazlı ölçü ve konfigürasyon talepleriniz için mimari destek ekibimizle iletişime geçebilirsiniz."
 );

 return paragraphs;
}
