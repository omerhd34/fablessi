"use client";

import Image from "next/image";
import Link from "next/link";
import {
 Carousel,
 CarouselContent,
 CarouselItem,
 CarouselNext,
 CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronRight } from "@/lib/icons";
import { productsMegaMenu } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function ProductMenuCard({ item }) {
 return (
  <Link href={item.href} className="group block">
   <div className="products-mega-menu-card relative aspect-square overflow-hidden rounded-2xl">
    <Image
     src={item.image}
     alt={item.label}
     fill
     sizes="(max-width: 640px) 42vw, (max-width: 1024px) 22vw, 13vw"
     className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
    />
    <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/5 to-transparent" />
    <span className="absolute right-2.5 bottom-2.5 left-2.5 text-sm font-semibold text-white drop-shadow-[0_1px_8px_rgb(0_0_0/45%)]">
     {item.label}
    </span>
   </div>
  </Link>
 );
}

export function ProductsMegaMenu({ open }) {
 const { groups } = productsMegaMenu;

 return (
  <div
   className={cn(
    "absolute inset-x-0 top-full z-50 pt-3 transition-[opacity,visibility,transform] ease-out",
    open
     ? "visible translate-y-0 opacity-100 duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
     : "pointer-events-none invisible -translate-y-2 opacity-0 duration-250 ease-in"
   )}
   aria-hidden={!open}
  >
   <div className="container-premium">
    <div className="products-mega-menu-panel products-mega-menu-scroll relative max-h-[min(72vh,44rem)] overflow-x-hidden overflow-y-auto px-3 py-4 md:px-5 md:py-5">
     <div className="space-y-6">
      {groups.map((group) => (
       <section key={group.slug} aria-label={group.label}>
        <div className="mb-3 flex items-baseline justify-between gap-3 px-1">
         <h3 className="text-sm font-semibold tracking-tight text-charcoal md:text-[0.9375rem]">
          {group.label}
         </h3>
         <Link
          href={group.href}
          className="inline-flex shrink-0 items-center gap-0.5 text-xs font-medium text-charcoal/60 transition-colors hover:text-charcoal"
         >
          Tümünü gör
          <ChevronRight className="size-3.5 shrink-0" aria-hidden />
         </Link>
        </div>

        <Carousel
         opts={{
          align: "start",
          dragFree: true,
          loop: group.items.length > 5,
         }}
         className="w-full"
        >
         <CarouselContent className="-ml-2.5 md:-ml-3">
          {group.items.map((item) => (
           <CarouselItem
            key={item.href}
            className="basis-[42%] pl-2.5 sm:basis-[30%] md:basis-[22%] md:pl-3 lg:basis-[15%] xl:basis-[13.5%]"
           >
            <ProductMenuCard item={item} />
           </CarouselItem>
          ))}
         </CarouselContent>

         {group.items.length > 4 ? (
          <>
           <CarouselPrevious
            variant="ghost"
            className="header-glass-btn left-1 size-9 cursor-pointer disabled:opacity-0 md:left-2 md:size-10"
           />
           <CarouselNext
            variant="ghost"
            className="header-glass-btn right-1 size-9 cursor-pointer disabled:opacity-0 md:right-2 md:size-10"
           />
          </>
         ) : null}
        </Carousel>
       </section>
      ))}
     </div>
    </div>
   </div>
  </div>
 );
}
