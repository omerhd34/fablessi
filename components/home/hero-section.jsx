/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "@/contexts/locale-provider";
import { HeroChevronLeft, HeroChevronRight } from "@/lib/icons";
import {
 buildHeroSlides,
 buildMobileHeroSlides,
} from "@/lib/i18n/hero-slides-data";
import { cn } from "@/lib/utils";

const HERO_AUTOPLAY_MS = 12_000;
const HERO_DESKTOP_MQ = "(min-width: 1024px)";
const HERO_MOBILE_MQ = "(max-width: 63.999rem)";

const heroNavButtonClass = "hero-nav-btn";

export function HeroSection() {
 const { dictionary, t } = useTranslations();
 const heroSlides = useMemo(
  () => buildHeroSlides(dictionary),
  [dictionary]
 );
 const mobileHeroSlides = useMemo(
  () => buildMobileHeroSlides(dictionary),
  [dictionary]
 );
 const [isMobileHero, setIsMobileHero] = useState(true);
 const activeSlides = isMobileHero ? mobileHeroSlides : heroSlides;
 const [dragEnabled, setDragEnabled] = useState(true);
 const [emblaRef, emblaApi] = useEmblaCarousel({
  loop: true,
  duration: 30,
  watchDrag: dragEnabled,
  dragFree: false,
 });
 const [selectedIndex, setSelectedIndex] = useState(0);
 const autoplayTimerRef = useRef(null);
 const autoplayRemainingRef = useRef(HERO_AUTOPLAY_MS);
 const autoplayStartedAtRef = useRef(0);

 useEffect(() => {
  const desktopMediaQuery = window.matchMedia(HERO_DESKTOP_MQ);
  const mobileHeroMediaQuery = window.matchMedia(HERO_MOBILE_MQ);

  const updateDragEnabled = () => setDragEnabled(!desktopMediaQuery.matches);
  const updateMobileHero = () => setIsMobileHero(mobileHeroMediaQuery.matches);

  updateDragEnabled();
  updateMobileHero();

  desktopMediaQuery.addEventListener("change", updateDragEnabled);
  mobileHeroMediaQuery.addEventListener("change", updateMobileHero);

  return () => {
   desktopMediaQuery.removeEventListener("change", updateDragEnabled);
   mobileHeroMediaQuery.removeEventListener("change", updateMobileHero);
  };
 }, []);

 useEffect(() => {
  if (!emblaApi) return;
  emblaApi.reInit({ watchDrag: dragEnabled });
  emblaApi.scrollTo(0, true);
 }, [dragEnabled, emblaApi, activeSlides]);

 const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
 const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

 const clearAutoplayTimer = useCallback(() => {
  if (autoplayTimerRef.current !== null) {
   window.clearTimeout(autoplayTimerRef.current);
   autoplayTimerRef.current = null;
  }
 }, []);

 const scheduleAutoplay = useCallback(
  (delay = HERO_AUTOPLAY_MS) => {
   if (!emblaApi) return;

   clearAutoplayTimer();
   autoplayRemainingRef.current = delay;
   autoplayStartedAtRef.current = Date.now();

   if (document.hidden) return;

   autoplayTimerRef.current = window.setTimeout(() => {
    emblaApi.scrollNext();
   }, delay);
  },
  [clearAutoplayTimer, emblaApi]
 );

 const pauseAutoplay = useCallback(() => {
  if (autoplayTimerRef.current === null) return;

  const elapsed = Date.now() - autoplayStartedAtRef.current;
  autoplayRemainingRef.current = Math.max(
   0,
   autoplayRemainingRef.current - elapsed
  );
  clearAutoplayTimer();
 }, [clearAutoplayTimer]);

 const resumeAutoplay = useCallback(() => {
  if (!emblaApi || autoplayTimerRef.current !== null) return;
  scheduleAutoplay(autoplayRemainingRef.current);
 }, [emblaApi, scheduleAutoplay]);

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

 useEffect(() => {
  const onVisibilityChange = () => {
   if (document.hidden) {
    pauseAutoplay();
   } else {
    resumeAutoplay();
   }
  };

  document.addEventListener("visibilitychange", onVisibilityChange);
  return () =>
   document.removeEventListener("visibilitychange", onVisibilityChange);
 }, [pauseAutoplay, resumeAutoplay]);

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
     {activeSlides.map((slide, index) => (
      <div key={slide.key} className="relative min-w-0 flex-[0_0_100%]">
       <div className="relative min-h-dvh w-full sm:min-h-svh">
        <Image
         src={slide.image}
         alt={slide.alt}
         fill
         priority={index === 0}
         sizes="100vw"
         className={cn("object-cover", slide.imagePosition ?? "object-center")}
        />
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
    {activeSlides.map((slide, index) => (
     <button
      key={slide.key}
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
