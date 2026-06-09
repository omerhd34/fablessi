/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useLocale } from "@/contexts/locale-provider";
import { ChevronLeft, ChevronRight, X } from "@/lib/icons";
import { cn } from "@/lib/utils";

const SWIPE_THRESHOLD = 48;

function LightboxControlButton({ className, children, ...props }) {
 return (
  <button
   type="button"
   className={cn(
    "flex cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-[0_8px_32px_rgb(0_0_0/24%)] backdrop-blur-md transition duration-200 hover:border-white/25 hover:bg-white/18 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 active:scale-95",
    className
   )}
   {...props}
  >
   {children}
  </button>
 );
}

export function ProductImageLightbox({
 images,
 index,
 onIndexChange,
 onClose,
}) {
 const { t } = useLocale();
 const open = index !== null && images.length > 0;
 const current = open ? images[index] : null;
 const hasPrev = open && index > 0;
 const hasNext = open && index < images.length - 1;
 const [slideDirection, setSlideDirection] = useState(0);
 const [isOpening, setIsOpening] = useState(false);
 const touchStartX = useRef(null);
 const thumbnailStripRef = useRef(null);

 useEffect(() => {
  if (!open) {
   setIsOpening(false);
   return;
  }

  setIsOpening(true);
  const timer = window.setTimeout(() => setIsOpening(false), 0);
  return () => window.clearTimeout(timer);
 }, [open]);

 const animationDirection = isOpening ? 0 : slideDirection;

 const goTo = useCallback(
  (nextIndex) => {
   if (nextIndex < 0 || nextIndex >= images.length) return;
   setSlideDirection(nextIndex > index ? 1 : nextIndex < index ? -1 : 0);
   onIndexChange(nextIndex);
  },
  [images.length, index, onIndexChange]
 );

 const goPrev = useCallback(() => {
  if (hasPrev) goTo(index - 1);
 }, [goTo, hasPrev, index]);

 const goNext = useCallback(() => {
  if (hasNext) goTo(index + 1);
 }, [goTo, hasNext, index]);

 useEffect(() => {
  if (!open) return undefined;

  const previousOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  const onKeyDown = (event) => {
   if (event.key === "Escape") onClose();
   if (event.key === "ArrowLeft") goPrev();
   if (event.key === "ArrowRight") goNext();
  };

  window.addEventListener("keydown", onKeyDown);

  return () => {
   document.body.style.overflow = previousOverflow;
   window.removeEventListener("keydown", onKeyDown);
  };
 }, [open, goPrev, goNext, onClose]);

 useEffect(() => {
  if (!open || !thumbnailStripRef.current) return;

  const activeThumb = thumbnailStripRef.current.querySelector(
   '[data-active="true"]'
  );

  activeThumb?.scrollIntoView({
   behavior: "smooth",
   inline: "center",
   block: "nearest",
  });
 }, [open, index]);

 const handleTouchStart = (event) => {
  touchStartX.current = event.touches[0]?.clientX ?? null;
 };

 const handleTouchEnd = (event) => {
  if (touchStartX.current === null) return;

  const endX = event.changedTouches[0]?.clientX;
  if (endX == null) return;

  const delta = endX - touchStartX.current;
  touchStartX.current = null;

  if (Math.abs(delta) < SWIPE_THRESHOLD) return;
  if (delta > 0) goPrev();
  else goNext();
 };

 if (!open || !current || typeof document === "undefined") return null;

 return createPortal(
  <div
   className="fixed inset-0 z-100 flex animate-in flex-col bg-black/78 duration-300 fade-in-0 supports-backdrop-filter:backdrop-blur-md"
   onClick={onClose}
   role="dialog"
   aria-modal="true"
   aria-label={current.alt ?? t("product.productImage")}
  >
   <header
    className="relative z-20 flex shrink-0 items-center justify-between gap-4 px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-2 md:px-8 md:pt-6"
    onClick={(event) => event.stopPropagation()}
   >
    {images.length > 1 ? (
     <p className="rounded-full border border-white/12 bg-white/10 px-3.5 py-1.5 text-sm font-medium tracking-wide text-white/90 backdrop-blur-md tabular-nums">
      <span className="text-white">{index + 1}</span>
      <span className="mx-1.5 text-white/45">/</span>
      <span className="text-white/70">{images.length}</span>
     </p>
    ) : (
     <span aria-hidden="true" />
    )}

    <LightboxControlButton
     onClick={onClose}
     className="size-11"
     aria-label={t("common.close")}
    >
     <X className="size-5" />
    </LightboxControlButton>
   </header>

   <div className="relative flex min-h-0 flex-1 items-center justify-center px-14 md:px-20">
    {hasPrev ? (
     <LightboxControlButton
      onClick={(event) => {
       event.stopPropagation();
       goPrev();
      }}
      className="absolute top-1/2 left-3 z-20 size-11 -translate-y-1/2 md:left-6 md:size-12"
      aria-label={t("product.previousImage")}
     >
      <ChevronLeft className="size-6" />
     </LightboxControlButton>
    ) : null}

    <div
     className="relative flex h-full w-full max-w-6xl items-center justify-center"
     onClick={(event) => event.stopPropagation()}
     onTouchStart={handleTouchStart}
     onTouchEnd={handleTouchEnd}
    >
     <div
      key={index}
      className={cn(
       "relative h-[min(72dvh,48rem)] w-full animate-in duration-300 fade-in-0",
       animationDirection === 1 && "slide-in-from-right-6",
       animationDirection === -1 && "slide-in-from-left-6",
       animationDirection === 0 && "zoom-in-95"
      )}
     >
      <Image
       src={current.url}
       alt={current.alt ?? t("product.productImage")}
       fill
       sizes="(max-width: 768px) 96vw, 80vw"
       className="object-contain drop-shadow-[0_24px_48px_rgb(0_0_0/35%)]"
       priority
      />
     </div>
    </div>

    {hasNext ? (
     <LightboxControlButton
      onClick={(event) => {
       event.stopPropagation();
       goNext();
      }}
      className="absolute top-1/2 right-3 z-20 size-11 -translate-y-1/2 md:right-6 md:size-12"
      aria-label={t("product.nextImage")}
     >
      <ChevronRight className="size-6" />
     </LightboxControlButton>
    ) : null}
   </div>

   {images.length > 1 ? (
    <footer
     className="relative z-20 shrink-0 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:px-8 md:pb-6"
     onClick={(event) => event.stopPropagation()}
    >
     <div
      ref={thumbnailStripRef}
      className="mx-auto flex max-w-3xl gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-white/8 p-2 backdrop-blur-md [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden"
      aria-label={t("product.productImages")}
     >
      {images.map((image, imageIndex) => {
       const isActive = imageIndex === index;

       return (
        <button
         key={image.id ?? image.url}
         type="button"
         data-active={isActive ? "true" : undefined}
         onClick={() => goTo(imageIndex)}
         className={cn(
          "relative size-14 shrink-0 cursor-pointer overflow-hidden rounded-xl border transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 md:size-16",
          isActive
           ? "border-white/70 opacity-100 shadow-[0_0_0_1px_rgb(255_255_255/20%)]"
           : "border-transparent opacity-55 hover:opacity-90"
         )}
         aria-label={t("product.enlargeImage", {
          alt: image.alt ?? t("product.productImage"),
         })}
         aria-current={isActive ? "true" : undefined}
        >
         <Image
          src={image.url}
          alt=""
          fill
          sizes="64px"
          className="object-cover"
          aria-hidden="true"
         />
        </button>
       );
      })}
     </div>
    </footer>
   ) : null}
  </div>,
  document.body
 );
}
