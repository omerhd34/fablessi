"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { HeroChevronLeft, HeroChevronRight } from "@/lib/icons";
import { productsMegaMenu } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const carouselCategories = productsMegaMenu.groups.map((group) => ({
 slug: group.slug,
 label: group.label,
 href: group.href,
 image: group.items[0]?.image,
}));

export function ProductsCategoryCarousel({ activeSlug, className }) {
 const [emblaRef, emblaApi] = useEmblaCarousel({
  align: "start",
  dragFree: true,
  containScroll: "trimSnaps",
 });

 return (
  <div className={cn("relative", className)}>
   <div className="overflow-hidden" ref={emblaRef}>
    <div className="flex gap-3 md:gap-4">
     {carouselCategories.map((category) => {
      const active = activeSlug === category.slug;

      return (
       <Link
        key={category.slug}
        href={category.href}
        className={cn(
         "group relative min-w-0 shrink-0 cursor-pointer basis-[42%] sm:basis-[30%] md:basis-[22%] lg:basis-[18%]",
         active && "ring-2 ring-charcoal/20 ring-offset-2 rounded-2xl"
        )}
       >
        <div className="product-category-tile relative aspect-4/3 overflow-hidden rounded-2xl">
         {category.image ? (
          <Image
           src={category.image}
           alt={category.label}
           fill
           sizes="(max-width: 640px) 42vw, 18vw"
           className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
         ) : null}
         <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />
         <span className="absolute right-3 bottom-3 left-3 text-sm font-semibold text-white drop-shadow-sm">
          {category.label}
         </span>
        </div>
       </Link>
      );
     })}
    </div>
   </div>

   <button
    type="button"
    onClick={() => emblaApi?.scrollPrev()}
    className="absolute top-1/2 -left-1 z-10 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-charcoal/10 bg-white/90 text-charcoal shadow-sm backdrop-blur-sm transition hover:bg-white md:-left-3 md:size-10"
    aria-label="Önceki kategoriler"
   >
    <HeroChevronLeft className="size-4 md:size-5" />
   </button>
   <button
    type="button"
    onClick={() => emblaApi?.scrollNext()}
    className="absolute top-1/2 -right-1 z-10 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-charcoal/10 bg-white/90 text-charcoal shadow-sm backdrop-blur-sm transition hover:bg-white md:-right-3 md:size-10"
    aria-label="Sonraki kategoriler"
   >
    <HeroChevronRight className="size-4 md:size-5" />
   </button>
  </div>
 );
}
