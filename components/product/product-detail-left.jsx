"use client";

import { CompareArrows, Copyright, Heart, Ruler } from "@/lib/icons";
import {
 getColorSwatch,
 getDimensionLabels,
 getProductShortName,
} from "@/lib/product-utils";
import { cn } from "@/lib/utils";

function getServiceItems(product) {
 const dimensionLabels = getDimensionLabels(product);
 const items = [];

 if (dimensionLabels.length > 0) {
  items.push({
   icon: Ruler,
   key: "dimensions",
   content: (
    <span className="flex flex-col gap-1">
     {dimensionLabels.map((item) => (
      <span key={item.key}>
       {item.label ? (
        <>
         <span className="font-semibold text-charcoal">{item.label}:</span>{" "}
         {item.value}
        </>
       ) : (
        item.value
       )}
      </span>
     ))}
    </span>
   ),
  });
 }

 items.push({
  icon: Copyright,
  key: "copyright",
  content: (
   <>
    Ürün görselleri ve tasarımlar{" "}
    <span className="font-semibold text-charcoal">Fablessi</span>&apos;ye aittir;
    izinsiz kullanılamaz.
   </>
  ),
 });

 return items;
}

function ActionButton({ icon: Icon, children, onClick, className }) {
 return (
  <button
   type="button"
   onClick={onClick}
   className={cn(
    "flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-charcoal/10 bg-white px-4 py-3.5 text-left text-sm font-medium text-charcoal shadow-[0_1px_3px_rgb(0_0_0/4%)] transition hover:border-charcoal/18 hover:shadow-[0_4px_16px_rgb(0_0_0/6%)]",
    className
   )}
  >
   <Icon className="size-5 shrink-0 text-charcoal/55" aria-hidden />
   <span>{children}</span>
  </button>
 );
}

export function ProductDetailLeft({
 product,
 categoryLabel,
 selectedVariant,
 onVariantChange,
 className,
}) {
 const serviceItems = getServiceItems(product);
 const variants = product.variants ?? [];

 return (
  <aside className={cn("flex flex-col gap-8", className)}>
   <div className="space-y-3">
    {categoryLabel ? (
     <p className="text-muted-foreground text-xs font-medium tracking-[0.14em] uppercase">
      {categoryLabel}
     </p>
    ) : null}
    <h1 className="font-heading text-3xl font-semibold tracking-tight text-charcoal md:text-4xl">
     {getProductShortName(product)}
    </h1>
   </div>

   <div className="space-y-2.5">
    <ActionButton icon={Heart}>Favorilere Ekle</ActionButton>
    <ActionButton icon={CompareArrows}>Ürünü Karşılaştır</ActionButton>
   </div>

   {variants.length > 0 ? (
    <div className="rounded-3xl border border-charcoal/10 bg-white p-4 shadow-[0_8px_30px_rgb(0_0_0/5%)]">
     <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="text-sm font-semibold text-charcoal">Renk</h2>
      <span className="text-sm text-charcoal/60">
       {selectedVariant?.color ?? selectedVariant?.name}
      </span>
     </div>
     <div className="flex flex-wrap gap-2.5">
      {variants.map((variant) => {
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
           backgroundColor: variant.color
            ? getColorSwatch(variant.color)
            : "#d1d5db",
          }}
         />
        </button>
       );
      })}
     </div>
    </div>
   ) : null}

   <div className="rounded-3xl border border-charcoal/8 bg-white p-5 shadow-[0_8px_30px_rgb(0_0_0/5%)]">
    <ul className="space-y-4">
     {serviceItems.map((item) => (
      <li key={item.key} className="flex gap-3">
       <item.icon className="mt-0.5 size-5 shrink-0 text-charcoal/45" aria-hidden />
       <p className="text-sm leading-relaxed text-charcoal/70">{item.content}</p>
      </li>
     ))}
    </ul>
   </div>
  </aside>
 );
}
