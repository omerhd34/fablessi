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
import { getPrimaryImageUrl } from "@/lib/queries/home";

const PLACEHOLDER =
 "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1200&q=80";

export function ArchitectPicksCarousel({ products }) {
 if (!products.length) {
  return null;
 }

 return (
  <section className="section-padding bg-white">
   <div className="container-premium">
    <div className="mb-10 text-center md:mb-14">
     <h2 className="heading-display text-charcoal">Öne Çıkan Ürünler</h2>
     <p className="text-muted-foreground mx-auto mt-3 max-w-xl text-sm md:text-base">
      Katalog vitrinimizden seçilmiş parçalar — detaylı bilgi ve teknik
      özelliklerle.
     </p>
    </div>

    <Carousel
     opts={{
      align: "start",
      loop: products.length > 2,
     }}
     className="w-full"
    >
     <CarouselContent className="-ml-3 md:-ml-4">
      {products.map((product) => {
       const imageUrl = getPrimaryImageUrl(product) ?? PLACEHOLDER;

       return (
        <CarouselItem
         key={product.id}
         className="basis-[78%] pl-3 sm:basis-[48%] md:basis-[38%] md:pl-4 lg:basis-[24%]"
        >
         <Link href={`/urunler/${product.slug}`} className="group block">
          <div className="product-card-kalif relative aspect-4/5 overflow-hidden">
           <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 78vw, 24vw"
            className="object-contain p-5 transition-transform duration-500 group-hover:scale-[1.03]"
           />
           <div className="absolute right-3 bottom-3 left-3">
            <span className="inline-flex rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-charcoal shadow-sm">
             {product.name}
            </span>
           </div>
          </div>
         </Link>
        </CarouselItem>
       );
      })}
     </CarouselContent>

     <div className="mt-8 flex justify-center gap-3">
      <CarouselPrevious className="static size-11 translate-x-0 translate-y-0 rounded-full border-charcoal/10 bg-white shadow-sm" />
      <CarouselNext className="static size-11 translate-x-0 translate-y-0 rounded-full border-charcoal/10 bg-white shadow-sm" />
     </div>
    </Carousel>
   </div>
  </section>
 );
}
