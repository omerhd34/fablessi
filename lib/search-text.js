import enDictionary from "@/lib/i18n/dictionaries/en";
import trDictionary from "@/lib/i18n/dictionaries/tr";
import { productMenuGroupsData } from "@/lib/i18n/navigation-data";

export function normalizeForSearch(value) {
 return value
  .toLocaleLowerCase("tr")
  .replaceAll("ı", "i")
  .replaceAll("ğ", "g")
  .replaceAll("ü", "u")
  .replaceAll("ş", "s")
  .replaceAll("ö", "o")
  .replaceAll("ç", "c");
}

export function expandSearchTerms(query) {
 const trimmed = query.trim();
 if (!trimmed) return [];

 const terms = new Set([trimmed]);
 const lower = trimmed.toLocaleLowerCase("tr");

 if (lower.length > 4 && (lower.endsWith("ler") || lower.endsWith("lar"))) {
  terms.add(lower.slice(0, -3));
 }

 return [...terms];
}

export function getCategoryMatchedProductSlugs(query) {
 const normalizedQuery = normalizeForSearch(query);
 const slugs = new Set();

 for (const group of productMenuGroupsData) {
  const labels = [
   group.slug,
   group.slug.replace(/-/g, " "),
   trDictionary.categories?.[group.slug],
   enDictionary.categories?.[group.slug],
  ].filter(Boolean);

  const matchesCategory = labels.some((label) => {
   const normalized = normalizeForSearch(label);
   return (
    normalized.includes(normalizedQuery) || normalizedQuery.includes(normalized)
   );
  });

  if (matchesCategory) {
   for (const item of group.items) {
    slugs.add(item.href.replace("/urunler/", ""));
   }
  }
 }

 return [...slugs];
}

function buildTextSearchFilters(terms) {
 return terms.flatMap((term) => [
  { name: { contains: term } },
  { nameEn: { contains: term } },
  { slug: { contains: term } },
  { collection: { name: { contains: term } } },
  { categoryGroup: { name: { contains: term } } },
  { categoryGroup: { nameEn: { contains: term } } },
  { categoryGroup: { slug: { contains: term } } },
  { collection: { nameEn: { contains: term } } },
 ]);
}

export function buildProductSearchWhere(query) {
 const terms = expandSearchTerms(query);
 const categoryProductSlugs = getCategoryMatchedProductSlugs(query);

 return {
  isPublished: true,
  OR: [
   ...buildTextSearchFilters(terms),
   ...(categoryProductSlugs.length > 0
    ? [{ slug: { in: categoryProductSlugs } }]
    : []),
  ],
 };
}

export function buildCollectionSearchWhere(query) {
 const terms = expandSearchTerms(query);

 return {
  isPublished: true,
  OR: terms.flatMap((term) => [
   { name: { contains: term } },
   { nameEn: { contains: term } },
  ]),
 };
}
