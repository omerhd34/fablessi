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
import { productsMegaMenu } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function ProductsMegaMenu({ open }) {
 const { categories } = productsMegaMenu;

 return (
  <div
   className={cn(
    "absolute inset-x-0 top-full z-50 px-4 pt-3 transition-[opacity,visibility,transform] ease-out sm:px-5 md:px-6 lg:px-8",
    open
     ? "visible translate-y-0 opacity-100 duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
     : "pointer-events-none invisible -translate-y-2 opacity-0 duration-250 ease-in"
   )}
   aria-hidden={!open}
  >
   <div className="products-mega-menu-panel relative mx-auto max-w-site px-3 py-4 md:px-5 md:py-5">
    <Carousel
     opts={{
      align: "start",
      loop: categories.length > 5,
     }}
     className="w-full"
    >
     <CarouselContent className="-ml-2.5 md:-ml-3">
      {categories.map((item) => (
       <CarouselItem
        key={item.href}
        className="basis-[42%] pl-2.5 sm:basis-[30%] md:basis-[22%] md:pl-3 lg:basis-[15%] xl:basis-[13.5%]"
       >
        <Link href={item.href} className="group block">
         <div className="relative aspect-square overflow-hidden rounded-2xl bg-white/35 shadow-[0_4px_20px_rgb(0_0_0/8%)]">
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
       </CarouselItem>
      ))}
     </CarouselContent>

     <CarouselPrevious
      variant="ghost"
      className="left-1 size-9 cursor-pointer border border-charcoal/10 bg-white/55 text-charcoal shadow-sm backdrop-blur-md hover:bg-white/75 disabled:opacity-0 md:left-2 md:size-10"
     />
     <CarouselNext
      variant="ghost"
      className="right-1 size-9 cursor-pointer border border-charcoal/10 bg-white/55 text-charcoal shadow-sm backdrop-blur-md hover:bg-white/75 disabled:opacity-0 md:right-2 md:size-10"
     />
    </Carousel>
   </div>
  </div>
 );
}
