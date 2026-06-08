"use client";

import Image from "next/image";
import {
 Accordion,
 AccordionContent,
 AccordionItem,
 AccordionTrigger,
} from "@/components/ui/accordion";
import { getProductMoreInfo, getVariantDimensions } from "@/lib/product-utils";
import { cn } from "@/lib/utils";

function ProductGallery({ images, onImageClick }) {
 if (images.length === 0) {
  return (
   <div className="flex aspect-4/3 items-center justify-center rounded-3xl bg-cream/60 text-sm text-charcoal/50">
    Görsel bulunamadı
   </div>
  );
 }

 return (
  <div className="space-y-3 md:space-y-4">
   {images.map((image, index) => (
    <button
     key={image.id}
     type="button"
     onClick={() => onImageClick?.(index)}
     className="relative block aspect-4/3 w-full cursor-pointer overflow-hidden rounded-3xl border border-charcoal/10 bg-cream/50 md:aspect-16/10"
     aria-label={`${image.alt ?? "Ürün görseli"} — büyüt`}
    >
     <Image
      src={image.url}
      alt={image.alt ?? "Ürün görseli"}
      fill
      sizes="(max-width: 1024px) 100vw, 60vw"
      className="object-cover transition-transform duration-300 hover:scale-[1.02]"
      priority={index === 0}
     />
    </button>
   ))}
  </div>
 );
}

function ProductSizeChart({ product, selectedVariant }) {
 return (
  <section id="product-size-chart" className="scroll-mt-6">
   <div className="overflow-hidden rounded-3xl border border-charcoal/10 bg-white">
    <div className="border-b border-charcoal/8 px-5 py-4">
     <h2 className="text-base font-semibold text-charcoal">Ölçü Tablosu</h2>
    </div>
    <div className="overflow-x-auto">
     <table className="w-full min-w-lg text-left text-sm">
      <thead>
       <tr className="bg-charcoal/5 text-charcoal/70">
        <th className="px-5 py-3 font-medium">Varyant</th>
        <th className="px-5 py-3 font-medium">Renk</th>
        <th className="px-5 py-3 font-medium">Malzeme</th>
        <th className="px-5 py-3 font-medium">Ölçüler</th>
       </tr>
      </thead>
      <tbody>
       {product.variants.map((variant) => {
        const active = selectedVariant?.id === variant.id;

        return (
         <tr
          key={variant.id}
          className={cn(
           "border-t border-charcoal/8",
           active && "bg-cream/70"
          )}
         >
          <td className="px-5 py-3 font-medium text-charcoal">{variant.name}</td>
          <td className="px-5 py-3 text-charcoal/75">{variant.color ?? "—"}</td>
          <td className="px-5 py-3 text-charcoal/75">
           {variant.material ?? "—"}
          </td>
          <td className="px-5 py-3 text-charcoal/75">
           {getVariantDimensions(product, variant)}
          </td>
         </tr>
        );
       })}
      </tbody>
     </table>
    </div>
   </div>
  </section>
 );
}

export function ProductDetailCenter({
 product,
 images,
 selectedVariant,
 onImageClick,
 className,
}) {
 const moreInfo = getProductMoreInfo(product);

 return (
  <div className={cn("space-y-8 md:space-y-10", className)}>
   <ProductGallery images={images} onImageClick={onImageClick} />

   <ProductSizeChart product={product} selectedVariant={selectedVariant} />

   <Accordion
    type="multiple"
    defaultValue={["product-info", "more-info"]}
    className="space-y-4"
   >
    <AccordionItem
     value="product-info"
     className="overflow-hidden rounded-3xl border border-charcoal/10 bg-white px-5 not-last:border-b-0"
    >
     <AccordionTrigger className="cursor-pointer py-4 text-base font-semibold text-charcoal hover:no-underline">
      Ürün Bilgisi
     </AccordionTrigger>
     <AccordionContent className="pb-5 text-sm leading-relaxed text-charcoal/75">
      {product.description ? <p>{product.description}</p> : null}
      {product.collection?.description ? (
       <p className="mt-4">{product.collection.description}</p>
      ) : null}
     </AccordionContent>
    </AccordionItem>

    <AccordionItem
     value="more-info"
     className="overflow-hidden rounded-3xl border border-charcoal/10 bg-white px-5 not-last:border-b-0"
    >
     <AccordionTrigger className="cursor-pointer py-4 text-base font-semibold text-charcoal hover:no-underline">
      Daha Fazla Bilgi
     </AccordionTrigger>
     <AccordionContent className="space-y-4 pb-5 text-sm leading-relaxed text-charcoal/75">
      {moreInfo.map((paragraph) => (
       <p key={paragraph}>{paragraph}</p>
      ))}
     </AccordionContent>
    </AccordionItem>
   </Accordion>
  </div>
 );
}
