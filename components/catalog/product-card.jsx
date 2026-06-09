"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductFavoriteButton } from "@/components/favorites/product-favorite-button";
import { useLocale } from "@/contexts/locale-provider";
import { getLocalizedCollectionName } from "@/lib/i18n/display-names";
import { getCategoryLabelForProduct } from "@/lib/product-category";
import { getPrimaryImageUrl } from "@/lib/product-utils";
import { cn } from "@/lib/utils";

export function ProductCard({
 product,
 className,
 priority = false,
 variant = "default",
 showFavoriteButton = false,
}) {
 const { dictionary } = useLocale();
 const imageUrl = getPrimaryImageUrl(product);
 const isCatalog = variant === "catalog";
 const categoryLabel =
  product.categoryLabel ??
  getCategoryLabelForProduct(product.slug, dictionary);
 const bottomLabel =
  getLocalizedCollectionName(product.collection, dictionary) ?? product.name;

 return (
  <article className={cn("group/card", className)}>
   <div
    className={cn(
     "product-card-kalif relative overflow-hidden",
     isCatalog ? "product-card-kalif--catalog aspect-5/4 rounded-3xl" : "aspect-4/5"
    )}
   >
    <Link
     href={`/urunler/${product.slug}`}
     className="absolute inset-0 block cursor-pointer"
    >
     {imageUrl ? (
      <Image
       src={imageUrl}
       alt={product.images?.[0]?.alt ?? product.name}
       fill
       sizes={
        isCatalog
         ? "(max-width: 640px) 100vw, 50vw"
         : "(max-width: 768px) 50vw, 25vw"
       }
       className="size-full object-cover transition-transform duration-500 group-hover/card:scale-[1.03]"
       priority={priority}
      />
     ) : (
      <div className="absolute inset-0 bg-cream/70" aria-hidden />
     )}

     <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />

     {categoryLabel ? (
      <span
       className={cn(
        "absolute top-3 right-3 z-10 inline-flex rounded-2xl bg-white/92 px-3 py-1.5 font-semibold text-charcoal shadow-sm backdrop-blur-sm",
        isCatalog ? "text-sm" : "text-xs"
       )}
      >
       {categoryLabel}
      </span>
     ) : null}

     <div className="absolute right-3 bottom-3 left-3">
      <span
       className={cn(
        "inline-flex max-w-[85%] rounded-full bg-white/95 font-semibold text-charcoal shadow-sm backdrop-blur-sm",
        isCatalog ? "px-4 py-2 text-sm" : "px-3.5 py-1.5 text-xs"
       )}
      >
       {bottomLabel}
      </span>
     </div>
    </Link>

    {showFavoriteButton ? (
     <ProductFavoriteButton
      product={product}
      className="absolute top-3 left-3 z-20"
     />
    ) : null}
   </div>
  </article>
 );
}
