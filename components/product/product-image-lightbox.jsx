"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "@/lib/icons";
export function ProductImageLightbox({
 images,
 index,
 onIndexChange,
 onClose,
}) {
 const open = index !== null && images.length > 0;
 const current = open ? images[index] : null;
 const hasPrev = open && index > 0;
 const hasNext = open && index < images.length - 1;

 useEffect(() => {
  if (!open) return undefined;

  const previousOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  const onKeyDown = (event) => {
   if (event.key === "Escape") onClose();
   if (event.key === "ArrowLeft" && hasPrev) onIndexChange(index - 1);
   if (event.key === "ArrowRight" && hasNext) onIndexChange(index + 1);
  };

  window.addEventListener("keydown", onKeyDown);

  return () => {
   document.body.style.overflow = previousOverflow;
   window.removeEventListener("keydown", onKeyDown);
  };
 }, [open, index, hasPrev, hasNext, onClose, onIndexChange]);

 if (!open || !current || typeof document === "undefined") return null;

 return createPortal(
  <div
   className="fixed inset-0 z-100 flex items-center justify-center bg-black/92 p-4 md:p-10"
   onClick={onClose}
   role="dialog"
   aria-modal="true"
   aria-label={current.alt ?? "Ürün görseli"}
  >
   <button
    type="button"
    onClick={onClose}
    className="absolute top-4 right-4 z-10 flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
    aria-label="Kapat"
   >
    <X className="size-6" />
   </button>

   {images.length > 1 ? (
    <p className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm text-white/90">
     {index + 1} / {images.length}
    </p>
   ) : null}

   <div
    className="relative flex w-full max-w-6xl items-center justify-center"
    onClick={(event) => event.stopPropagation()}
   >
    {hasPrev ? (
     <button
      type="button"
      onClick={() => onIndexChange(index - 1)}
      className="absolute left-0 z-10 flex size-11 -translate-x-2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 md:-translate-x-14 md:size-12"
      aria-label="Önceki görsel"
     >
      <ChevronLeft className="size-6" />
     </button>
    ) : null}

    <div className="relative h-[min(85vh,52rem)] w-full">
     <Image
      src={current.url}
      alt={current.alt ?? "Ürün görseli"}
      fill
      sizes="96vw"
      className="object-contain"
      priority
     />
    </div>

    {hasNext ? (
     <button
      type="button"
      onClick={() => onIndexChange(index + 1)}
      className="absolute right-0 z-10 flex size-11 translate-x-2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 md:translate-x-14 md:size-12"
      aria-label="Sonraki görsel"
     >
      <ChevronRight className="size-6" />
     </button>
    ) : null}
   </div>
  </div>,
  document.body
 );
}
