"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "@/contexts/locale-provider";
import { HeroChevronLeft, HeroChevronRight } from "@/lib/icons";
import { buildHeroSlides } from "@/lib/i18n/hero-slides-data";
import { cn } from "@/lib/utils";

const HERO_AUTOPLAY_MS = 12_000;
const HERO_DESKTOP_MQ = "(min-width: 1024px)";

const heroNavButtonClass = "hero-nav-btn";

export function HeroSection() {
 const { dictionary, t } = useTranslations();
 const heroSlides = useMemo(
  () => buildHeroSlides(dictionary),
  [dictionary]
 );
 const [dragEnabled, setDragEnabled] = useState(true);
 const [emblaRef, emblaApi] = useEmblaCarousel({
  loop: true,
  duration: 30,
  watchDrag: dragEnabled,
  dragFree: false,
 });
 const [selectedIndex, setSelectedIndex] = useState(0);
 const autoplayTimerRef = useRef(null);

 useEffect(() => {
  const mediaQuery = window.matchMedia(HERO_DESKTOP_MQ);
  const updateDragEnabled = () => setDragEnabled(!mediaQuery.matches);

  updateDragEnabled();
  mediaQuery.addEventListener("change", updateDragEnabled);

  return () => mediaQuery.removeEventListener("change", updateDragEnabled);
 }, []);

 useEffect(() => {
  if (!emblaApi) return;
  emblaApi.reInit({ watchDrag: dragEnabled });
 }, [dragEnabled, emblaApi]);

 const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
 const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

 const clearAutoplayTimer = useCallback(() => {
  if (autoplayTimerRef.current !== null) {
   window.clearTimeout(autoplayTimerRef.current);
   autoplayTimerRef.current = null;
  }
 }, []);

 const scheduleAutoplay = useCallback(() => {
  if (!emblaApi) return;

  clearAutoplayTimer();
  autoplayTimerRef.current = window.setTimeout(() => {
   emblaApi.scrollNext();
  }, HERO_AUTOPLAY_MS);
 }, [clearAutoplayTimer, emblaApi]);

 useEffect(() => {
  if (!emblaApi) return;

  const onSelect = () => {
   setSelectedIndex(emblaApi.selectedScrollSnap());
   scheduleAutoplay();
  };

  onSelect();
  const onPointerDown = () => clearAutoplayTimer();

  emblaApi.on("select", onSelect);
  emblaApi.on("reInit", onSelect);
  emblaApi.on("pointerDown", onPointerDown);

  return () => {
   emblaApi.off("select", onSelect);
   emblaApi.off("reInit", onSelect);
   emblaApi.off("pointerDown", onPointerDown);
   clearAutoplayTimer();
  };
 }, [clearAutoplayTimer, emblaApi, scheduleAutoplay]);

 return (
  <section className="hero-carousel relative w-full touch-pan-y">
   <div
    className={cn(
     "hero-carousel__viewport overflow-hidden",
     dragEnabled
      ? "hero-carousel__viewport--draggable"
      : "hero-carousel__viewport--static"
    )}
    ref={emblaRef}
   >
    <div className="flex">
     {heroSlides.map((slide, index) => (
      <div key={slide.cta.href} className="relative min-w-0 flex-[0_0_100%]">
       <div className="relative min-h-dvh w-full sm:min-h-svh">
        <Image
         src={slide.image}
         alt={slide.alt}
         fill
         priority={index === 0}
         sizes="100vw"
         className={cn("object-cover", slide.imagePosition ?? "object-center")}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/30" />

        <div className="hero-slide-copy-wrap absolute inset-0 flex items-center justify-center px-3 sm:px-6">
         <div className="hero-slide-copy">
          <div className="hero-slide-copy__panel">
           <h1 className="hero-slide-copy__headline">{slide.headline}</h1>
           <div className="hero-slide-copy__lines">
            {slide.lines.map((line) => (
             <p key={line} className="hero-slide-copy__line">
              {line}
             </p>
            ))}
           </div>
          </div>
          <Link
           href={slide.cta.href}
           className="hero-slide-copy__cta"
          >
           {slide.cta.label}
          </Link>
         </div>
        </div>
       </div>
      </div>
     ))}
    </div>
   </div>

   <button
    type="button"
    onClick={scrollPrev}
    className={cn(heroNavButtonClass, "hero-nav-btn--prev hero-nav-btn--desktop")}
    aria-label={t("hero.prevSlide")}
   >
    <HeroChevronLeft className="hero-nav-btn__icon" aria-hidden />
   </button>
   <button
    type="button"
    onClick={scrollNext}
    className={cn(heroNavButtonClass, "hero-nav-btn--next hero-nav-btn--desktop")}
    aria-label={t("hero.nextSlide")}
   >
    <HeroChevronRight className="hero-nav-btn__icon" aria-hidden />
   </button>

   <div className="hero-carousel__dots absolute left-1/2 z-10 flex -translate-x-1/2 gap-2">
    {heroSlides.map((slide, index) => (
     <button
      key={slide.cta.href}
      type="button"
      onClick={() => emblaApi?.scrollTo(index)}
      className={cn(
       "hero-carousel__dash cursor-pointer transition-all duration-300",
       selectedIndex === index && "hero-carousel__dash--active"
      )}
      aria-label={t("hero.slide", { n: index + 1 })}
      aria-current={selectedIndex === index ? "true" : undefined}
     />
    ))}
   </div>
  </section>
 );
}
