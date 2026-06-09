"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductFavoriteButton } from "@/components/favorites/product-favorite-button";
import { useLocale } from "@/contexts/locale-provider";
import {
 formatProductPrice,
 getPrimaryImageUrl,
 getProductCardBottomLabel,
 getProductDisplayPrice,
} from "@/lib/product-utils";
import { cn } from "@/lib/utils";

export function ProductCard({
 product,
 className,
 priority = false,
 variant = "default",
 showFavoriteButton = false,
}) {
 const { locale } = useLocale();
 const imageUrl = getPrimaryImageUrl(product);
 const isCatalog = variant === "catalog";
 const bottomLabel = getProductCardBottomLabel(product, locale);
 const priceLabel = formatProductPrice(getProductDisplayPrice(product), locale);
 const badgeClassName = cn(
  "inline-flex rounded-full border border-white/20 bg-white/15 font-medium text-white shadow-[0_4px_16px_rgb(0_0_0/18%)] backdrop-blur-md",
  isCatalog ? "px-3 py-1.5 text-xs" : "px-2.5 py-1 text-[0.65rem]"
 );

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

     <div className="absolute right-3 bottom-3 left-3 flex items-end justify-between gap-2">
      <span className={cn(badgeClassName, "min-w-0 max-w-[65%] truncate")}>
       {bottomLabel}
      </span>
      <span className={cn(badgeClassName, "shrink-0")}>{priceLabel}</span>
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
