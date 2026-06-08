"use client";

import { getProductCardLabel } from "@/lib/product-utils";
import { ProductCategoryRelated } from "@/components/product/product-category-related";
import { cn } from "@/lib/utils";

export function ProductDetailRight({
 product,
 selectedVariant,
 categoryLabel,
 categoryProducts,
 className,
}) {
 const variants = product.variants ?? [];

 return (
  <aside className={cn("flex flex-col gap-4 lg:self-start", className)}>
   {variants.length === 0 ? (
    <div className="shrink-0 rounded-3xl border border-charcoal/10 bg-white p-4 shadow-[0_8px_30px_rgb(0_0_0/5%)]">
     <h2 className="text-sm font-semibold text-charcoal">
      {getProductCardLabel(product)}
     </h2>
     <p className="text-muted-foreground mt-1 text-xs">
      {selectedVariant?.material ?? "Standart konfigürasyon"}
     </p>
    </div>
   ) : null}

   {categoryLabel && categoryProducts.length > 0 ? (
    <ProductCategoryRelated
     products={categoryProducts}
     categoryLabel={categoryLabel}
    />
   ) : null}
  </aside>
 );
}
