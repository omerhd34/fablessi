"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/catalog/product-card";
import { ProductsCatalogToolbar } from "@/components/catalog/products-catalog-toolbar";
import { ProductsCategoryCarousel } from "@/components/catalog/products-category-carousel";
import { useLocale } from "@/contexts/locale-provider";
import { getLocalizedCollectionName } from "@/lib/i18n/display-names";

function sortProducts(products, sort) {
 const list = [...products];

 switch (sort) {
  case "newest":
   return list.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
   );
  case "name-asc":
   return list.sort((a, b) => a.name.localeCompare(b.name, "tr"));
  case "name-desc":
   return list.sort((a, b) => b.name.localeCompare(a.name, "tr"));
  case "featured":
  default:
   return list.sort(
    (a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name, "tr")
   );
 }
}

export function ProductsCatalogShell({
 products,
 activeGroup,
 activeCollection,
 categorySlug,
 collectionSlug,
}) {
 const { t, dictionary } = useLocale();
 const [search, setSearch] = useState("");
 const [sort, setSort] = useState("featured");

 const filteredProducts = useMemo(() => {
  const query = search.trim().toLowerCase();

  const list = products.filter((product) => {
   if (!query) return true;

   return (
    product.name.toLowerCase().includes(query) ||
    product.collection?.name?.toLowerCase().includes(query)
   );
  });

  return sortProducts(list, sort);
 }, [products, search, sort]);

 const categoryHeroImage = activeGroup?.items?.[0]?.image ?? null;

 return (
  <div className="space-y-6 md:space-y-8">
   {categoryHeroImage ? (
    <div className="relative -mx-4 hidden h-44 overflow-hidden sm:-mx-5 sm:h-52 md:-mx-6 lg:-mx-8 lg:block lg:h-56 xl:-mx-10">
     <Image
      src={categoryHeroImage}
      alt={activeGroup.label}
      fill
      priority
      sizes="100vw"
      className="object-cover"
     />
     <div className="absolute inset-0 bg-linear-to-b from-black/25 via-black/5 to-transparent" />
    </div>
   ) : null}

   <div>
    <h1 className="heading-display text-charcoal">
     {activeCollection
      ? getLocalizedCollectionName(activeCollection, dictionary) ??
       activeCollection.name
      : activeGroup
       ? activeGroup.label
       : t("catalog.allProductsTitle")}
    </h1>
    <p className="text-muted-foreground mt-2 hidden text-sm lg:block">
     {t("catalog.listing", { count: filteredProducts.length })}
    </p>
   </div>

   {!categorySlug && !collectionSlug ? (
    <ProductsCategoryCarousel
     activeSlug={categorySlug}
     className="hidden md:block"
    />
   ) : null}

   <ProductsCatalogToolbar
    search={search}
    onSearchChange={setSearch}
    sort={sort}
    onSortChange={setSort}
    resultCount={filteredProducts.length}
   />

   {filteredProducts.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:gap-6">
     {filteredProducts.map((product, index) => (
      <ProductCard
       key={product.id}
       product={product}
       priority={index < 2}
       variant="catalog"
      />
     ))}
    </div>
   ) : (
    <div className="rounded-3xl border border-dashed border-charcoal/12 bg-cream/40 px-6 py-20 text-center">
     <p className="text-sm font-medium text-charcoal">
      {t("catalog.noProducts")}
     </p>
     <p className="text-muted-foreground mt-2 text-sm">
      {t("catalog.tryAgain")}
     </p>
    </div>
   )}
  </div>
 );
}
