"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "@/lib/icons";
import { cn } from "@/lib/utils";

const HERO_SLIDES = [
 {
  image:
   "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=2400&q=85",
  alt: "Fablessi bahçe mobilyası — dış mekan oturma grubu",
  headline: "Yaz Fablessi ile başlar.",
  lines: [
   "Bahçeniz ve açık alanlarınız yaza hazır mı?",
   "Dış mekan koleksiyonumuz şimdi fablessi.com'da.",
  ],
  cta: { label: "Keşfet", href: "/koleksiyonlar" },
 },
 {
  image:
   "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2400&q=85",
  alt: "Premium bahçe mobilyası koleksiyonu",
  headline: "Sessiz lüks, açık havada.",
  lines: [
   "İnegöl'ün ustalığıyla şekillenen zamansız formlar.",
   "Kurumsal katalog ve koleksiyon vitrinimizi keşfedin.",
  ],
  cta: { label: "Koleksiyonlar", href: "/koleksiyonlar" },
 },
 {
  image:
   "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=2400&q=85",
  alt: "Modern dış mekan yaşam alanı",
  headline: "Bahçenizi yeniden keşfedin.",
  lines: [
   "Minimalist tasarım, üstün malzeme kalitesi.",
   "Detaylı ürün bilgileri ve teknik özelliklerle.",
  ],
  cta: { label: "Ürünler", href: "/urunler" },
 },
];

export function HeroSection() {
 const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });
 const [selectedIndex, setSelectedIndex] = useState(0);

 const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
 const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

 useEffect(() => {
  if (!emblaApi) return;

  const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
  onSelect();
  emblaApi.on("select", onSelect);
  emblaApi.on("reInit", onSelect);

  return () => {
   emblaApi.off("select", onSelect);
   emblaApi.off("reInit", onSelect);
  };
 }, [emblaApi]);

 useEffect(() => {
  if (!emblaApi) return;
  const interval = window.setInterval(() => emblaApi.scrollNext(), 7000);
  return () => window.clearInterval(interval);
 }, [emblaApi]);

 return (
  <section className="relative w-full">
   <div className="overflow-hidden" ref={emblaRef}>
    <div className="flex">
     {HERO_SLIDES.map((slide, index) => (
      <div key={slide.headline} className="relative min-w-0 flex-[0_0_100%]">
       <div className="relative min-h-svh w-full">
        <Image
         src={slide.image}
         alt={slide.alt}
         fill
         priority={index === 0}
         sizes="100vw"
         className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/15 via-transparent to-black/25" />

        <div className="absolute inset-x-0 top-[38%] flex -translate-y-1/2 flex-col items-center px-6 text-center">
         <h1 className="text-kalif-blue max-w-3xl text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-[2.75rem]">
          {slide.headline}
         </h1>
         <div className="mt-4 max-w-lg space-y-1">
          {slide.lines.map((line) => (
           <p
            key={line}
            className="text-sm font-medium text-white/95 drop-shadow-sm sm:text-base"
           >
            {line}
           </p>
          ))}
         </div>
         <Link
          href={slide.cta.href}
          className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-white/90 px-8 text-sm font-semibold text-charcoal shadow-lg transition hover:bg-white"
         >
          {slide.cta.label}
         </Link>
        </div>
       </div>
      </div>
     ))}
    </div>
   </div>

   <button
    type="button"
    onClick={scrollPrev}
    className="absolute top-1/2 left-4 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/50 sm:left-6"
    aria-label="Önceki slayt"
   >
    <ChevronLeft className="size-6" />
   </button>
   <button
    type="button"
    onClick={scrollNext}
    className="absolute top-1/2 right-4 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/50 sm:right-6"
    aria-label="Sonraki slayt"
   >
    <ChevronRight className="size-6" />
   </button>

   <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
    {HERO_SLIDES.map((slide, index) => (
     <button
      key={slide.headline}
      type="button"
      onClick={() => emblaApi?.scrollTo(index)}
      className={cn(
       "h-0.5 rounded-full transition-all duration-300",
       selectedIndex === index
        ? "w-8 bg-white"
        : "w-5 bg-white/45 hover:bg-white/70"
      )}
      aria-label={`Slayt ${index + 1}`}
     />
    ))}
   </div>
  </section>
 );
}
