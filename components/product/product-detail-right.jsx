"use client";

import {
 getColorSwatch,
 getProductCardLabel,
} from "@/lib/product-utils";
import { ProductCategoryRelated } from "@/components/product/product-category-related";
import { cn } from "@/lib/utils";

export function ProductDetailRight({
 product,
 selectedVariant,
 onVariantChange,
 categoryLabel,
 categoryProducts,
 className,
}) {
 const colorVariants = product.variants.filter((variant) => variant.color);

 return (
  <aside className={cn("flex min-h-0 flex-col gap-4", className)}>
   {colorVariants.length > 0 ? (
    <div className="shrink-0 rounded-3xl border border-charcoal/10 bg-white p-4 shadow-[0_8px_30px_rgb(0_0_0/5%)]">
     <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="text-sm font-semibold text-charcoal">Renk</h2>
      <span className="text-sm text-charcoal/60">
       {selectedVariant?.color ?? selectedVariant?.name}
      </span>
     </div>
     <div className="flex flex-wrap gap-2.5">
      {colorVariants.map((variant) => {
       const active = selectedVariant?.id === variant.id;

       return (
        <button
         key={variant.id}
         type="button"
         title={variant.color ?? variant.name}
         onClick={() => onVariantChange(variant)}
         className={cn(
          "flex size-10 cursor-pointer items-center justify-center rounded-full border-2 transition-transform hover:scale-105",
          active ? "border-charcoal" : "border-transparent"
         )}
         aria-label={variant.color ?? variant.name}
         aria-pressed={active}
        >
         <span
          className="block size-8 rounded-full border border-charcoal/10"
          style={{
           backgroundColor: getColorSwatch(variant.color),
          }}
         />
        </button>
       );
      })}
     </div>
    </div>
   ) : (
    <div className="shrink-0 rounded-3xl border border-charcoal/10 bg-white p-4 shadow-[0_8px_30px_rgb(0_0_0/5%)]">
     <h2 className="text-sm font-semibold text-charcoal">
      {getProductCardLabel(product)}
     </h2>
     <p className="text-muted-foreground mt-1 text-xs">
      {selectedVariant?.material ?? "Standart konfigürasyon"}
     </p>
    </div>
   )}

   {categoryLabel && categoryProducts.length > 0 ? (
    <ProductCategoryRelated
     products={categoryProducts}
     categoryLabel={categoryLabel}
    />
   ) : null}
  </aside>
 );
}
