/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
 Accordion,
 AccordionContent,
 AccordionItem,
 AccordionTrigger,
} from "@/components/ui/accordion";
import {
 Carousel,
 CarouselContent,
 CarouselDots,
 CarouselItem,
} from "@/components/ui/carousel";
import { ProductDimensionsTable } from "@/components/product/product-dimensions-table";
import { useLocale } from "@/contexts/locale-provider";
import { getDimensionItems } from "@/lib/product-utils";
import { cn } from "@/lib/utils";

function ProductGalleryImage({
 image,
 index,
 onImageClick,
 variant = "stack",
 className,
 t,
}) {
 const isSlide = variant === "slide";
 const wrapperClassName = cn(
  "relative block w-full overflow-hidden",
  isSlide
   ? "aspect-4/3 bg-white min-[48rem]:aspect-16/10"
   : "product-gallery-frame aspect-4/3 min-[1152px]:aspect-16/10 cursor-pointer rounded-3xl bg-white",
  className
 );

 const imageElement = (
  <Image
   src={image.url}
   alt={image.alt ?? t("product.productImage")}
   fill
   sizes="(max-width: 1151px) 100vw, 60vw"
   className={cn(
    "object-cover transition-transform duration-300",
    !isSlide && "hover:scale-[1.02]"
   )}
   priority={index === 0}
  />
 );

 if (isSlide) {
  return <div className={wrapperClassName}>{imageElement}</div>;
 }

 return (
  <button
   type="button"
   onClick={() => onImageClick?.(index)}
   className={wrapperClassName}
   aria-label={t("product.enlargeImage", {
    alt: image.alt ?? t("product.productImage"),
   })}
  >
   {imageElement}
  </button>
 );
}

function ProductGallery({ images, onImageClick, t }) {
 if (images.length === 0) {
  return (
   <div className="flex aspect-4/3 items-center justify-center rounded-3xl bg-cream/60 text-sm text-charcoal/50">
    {t("product.noImage")}
   </div>
  );
 }

 return (
  <>
   <div className="product-gallery-mobile min-[1152px]:hidden">
    <Carousel
     opts={{
      align: "start",
      loop: false,
      containScroll: "trimSnaps",
     }}
     className="w-full"
     aria-label={t("product.productImages")}
    >
     <CarouselContent className="ml-0">
      {images.map((image, index) => (
       <CarouselItem key={image.id} className="min-w-0 basis-full pl-0">
        <ProductGalleryImage
         image={image}
         index={index}
         onImageClick={onImageClick}
         variant="slide"
         t={t}
        />
       </CarouselItem>
      ))}
     </CarouselContent>
     <CarouselDots className="mt-3" />
    </Carousel>
   </div>

   <div className="hidden min-[1152px]:block min-[1152px]:space-y-4">
    {images.map((image, index) => (
     <ProductGalleryImage
      key={image.id}
      image={image}
      index={index}
      onImageClick={onImageClick}
      t={t}
     />
    ))}
   </div>
  </>
 );
}

export function ProductDetailCenter({
 product,
 images,
 onImageClick,
 className,
 openDimensions = false,
 belowGallery,
}) {
 const { t } = useLocale();
 const dimensionItems = getDimensionItems(product);
 const [accordionValue, setAccordionValue] = useState([]);

 useEffect(() => {
  if (window.matchMedia("(min-width: 768px)").matches) {
   setAccordionValue(["product-info"]);
  }
 }, []);

 useEffect(() => {
  if (!openDimensions) return;

  setAccordionValue((current) =>
   current.includes("dimensions") ? current : [...current, "dimensions"]
  );
 }, [openDimensions]);

 return (
  <div className={cn("flex flex-col gap-4 md:gap-10", className)}>
   <ProductGallery images={images} onImageClick={onImageClick} t={t} />

   {belowGallery}

   <Accordion
    type="multiple"
    value={accordionValue}
    onValueChange={setAccordionValue}
    className="flex flex-col gap-4"
   >
    <AccordionItem
     value="product-info"
     className="overflow-hidden rounded-3xl border border-charcoal/12 bg-white px-5 shadow-[0_1px_3px_rgb(0_0_0/4%)]"
    >
     <AccordionTrigger className="cursor-pointer py-4 text-base font-semibold text-charcoal hover:no-underline">
      {t("product.productInfo")}
     </AccordionTrigger>
     <AccordionContent className="pb-6 text-sm leading-relaxed text-charcoal/75">
      {product.description ? <p>{product.description}</p> : null}
      {product.collection?.description ? (
       <p className="mt-4">{product.collection.description}</p>
      ) : null}
     </AccordionContent>
    </AccordionItem>

    {dimensionItems.length > 0 ? (
     <AccordionItem
      value="dimensions"
      data-product-dimensions=""
      className="scroll-mt-6 overflow-hidden rounded-3xl border border-charcoal/12 bg-white px-5 shadow-[0_1px_3px_rgb(0_0_0/4%)]"
     >
      <AccordionTrigger className="cursor-pointer py-4 text-base font-semibold text-charcoal hover:no-underline">
       {t("product.dimensionsTableTitle")}{" "}
       <span className="font-normal text-charcoal/55">
        ({t("product.dimensionUnit")})
       </span>
      </AccordionTrigger>
      <AccordionContent className="pb-5">
       <ProductDimensionsTable product={product} t={t} />
      </AccordionContent>
     </AccordionItem>
    ) : null}
   </Accordion>
  </div>
 );
}
