"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/contexts/locale-provider";
import { getLocalizedCollectionName } from "@/lib/i18n/display-names";
import { getPrimaryImageUrl, getProductCardLabel } from "@/lib/product-utils";

export function ProductCategoryRelated({ products, categoryLabel }) {
 const { dictionary } = useLocale();
 if (products.length === 0) return null;

 return (
  <div className="product-related-panel flex shrink-0 flex-col overflow-hidden rounded-3xl">
   <div className="product-related-panel__header shrink-0 px-4 py-3.5 text-center">
    <h2 className="text-sm font-semibold text-charcoal">{categoryLabel}</h2>
   </div>
   <div className="p-3">
    <div className="space-y-3">
     {products.map((product) => {
      const imageUrl = getPrimaryImageUrl(product);
      const defaultVariant =
       product.variants?.find((variant) => variant.isDefault) ??
       product.variants?.[0];

      return (
       <Link
        key={product.id}
        href={`/urunler/${product.slug}`}
        className="product-related-item group flex cursor-pointer gap-3 rounded-2xl p-2.5"
       >
        <div className="product-related-item__thumb relative size-16 shrink-0 overflow-hidden rounded-xl">
         {imageUrl ? (
          <Image
           src={imageUrl}
           alt={product.images?.[0]?.alt ?? product.name}
           fill
           sizes="64px"
           className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
         ) : null}
        </div>
        <div className="min-w-0 flex-1 py-0.5">
         <p className="truncate text-sm font-semibold text-charcoal">
          {getProductCardLabel(product, dictionary)}
         </p>
         {product.collection?.name ? (
          <p className="text-muted-foreground mt-0.5 text-xs">
           {getLocalizedCollectionName(product.collection, dictionary) ??
            product.collection.name}
          </p>
         ) : null}
         {defaultVariant?.material ? (
          <p className="text-muted-foreground mt-1 truncate text-xs">
           {defaultVariant.material}
          </p>
         ) : null}
        </div>
       </Link>
      );
     })}
    </div>
   </div>
  </div>
 );
}
