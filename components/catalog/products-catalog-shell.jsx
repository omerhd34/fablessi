"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/catalog/product-card";
import { ProductsCatalogToolbar } from "@/components/catalog/products-catalog-toolbar";
import { ProductsCategoryCarousel } from "@/components/catalog/products-category-carousel";
import { ProductsFiltersSidebar } from "@/components/catalog/products-filters-sidebar";

function sortProducts(products, sort) {
 const list = [...products];

 switch (sort) {
  case "name-asc":
   return list.sort((a, b) => a.name.localeCompare(b.name, "tr"));
  case "name-desc":
   return list.sort((a, b) => b.name.localeCompare(a.name, "tr"));
  case "newest":
   return list.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
   );
  default:
   return list.sort(
    (a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name, "tr")
   );
 }
}

function getAvailableColors(products) {
 const colors = new Set();

 for (const product of products) {
  for (const variant of product.variants ?? []) {
   if (variant.color) colors.add(variant.color);
  }
 }

 return [...colors];
}

export function ProductsCatalogShell({
 products,
 activeGroup,
 activeCollection,
 categorySlug,
 collectionSlug,
}) {
 const [search, setSearch] = useState("");
 const [sort, setSort] = useState("featured");
 const [selectedColor, setSelectedColor] = useState(null);

 const availableColors = useMemo(() => getAvailableColors(products), [products]);

 const filteredProducts = useMemo(() => {
  const query = search.trim().toLowerCase();

  let list = products.filter((product) => {
   const matchesSearch =
    !query ||
    product.name.toLowerCase().includes(query) ||
    product.collection?.name?.toLowerCase().includes(query);

   const matchesColor =
    !selectedColor ||
    product.variants?.some((variant) => variant.color === selectedColor);

   return matchesSearch && matchesColor;
  });

  return sortProducts(list, sort);
 }, [products, search, selectedColor, sort]);

 const categoryHeroImage = activeGroup?.items?.[0]?.image ?? null;

 return (
  <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
   <ProductsFiltersSidebar
    categorySlug={categorySlug}
    selectedColor={selectedColor}
    onColorChange={setSelectedColor}
    availableColors={availableColors}
    className="hidden lg:block"
   />

   <div className="min-w-0 flex-1 space-y-6 md:space-y-8">
    {categoryHeroImage ? (
     <div className="relative -mx-4 h-44 overflow-hidden sm:-mx-5 sm:h-52 md:-mx-6 lg:-mx-8 lg:h-56 xl:-mx-10">
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
       ? activeCollection.name
       : activeGroup
         ? activeGroup.label
         : "Tüm Ürünler"}
     </h1>
     <p className="text-muted-foreground mt-2 text-sm">
      {filteredProducts.length} ürün listeleniyor.
     </p>
    </div>

    {!categorySlug && !collectionSlug ? (
     <ProductsCategoryCarousel activeSlug={categorySlug} />
    ) : null}

    <ProductsFiltersSidebar
     categorySlug={categorySlug}
     selectedColor={selectedColor}
     onColorChange={setSelectedColor}
     availableColors={availableColors}
     className="lg:hidden"
    />

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
       Aramanızla eşleşen ürün bulunamadı.
      </p>
      <p className="text-muted-foreground mt-2 text-sm">
       Filtreleri temizleyerek tekrar deneyin.
      </p>
     </div>
    )}
   </div>
  </div>
 );
}
