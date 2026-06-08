"use client";

import Image from "next/image";
import {
 Accordion,
 AccordionContent,
 AccordionItem,
 AccordionTrigger,
} from "@/components/ui/accordion";
import { getProductMoreInfo } from "@/lib/product-utils";
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

export function ProductDetailCenter({
 product,
 images,
 onImageClick,
 className,
}) {
 const moreInfo = getProductMoreInfo(product);

 return (
  <div className={cn("space-y-8 md:space-y-10", className)}>
   <ProductGallery images={images} onImageClick={onImageClick} />

   <Accordion
    type="multiple"
    defaultValue={["product-info"]}
    className="space-y-4"
   >
    <AccordionItem
     value="product-info"
     className="overflow-hidden rounded-3xl border border-charcoal/12 bg-white px-5 shadow-[0_1px_3px_rgb(0_0_0/4%)]"
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
     className="overflow-hidden rounded-3xl border border-charcoal/12 bg-white px-5 shadow-[0_1px_3px_rgb(0_0_0/4%)]"
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
