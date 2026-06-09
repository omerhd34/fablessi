/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { TbArrowUp, TbBrandWhatsapp, TbPhone } from "react-icons/tb";
import { useTranslations } from "@/contexts/locale-provider";
import { getWhatsAppHref, sitePhoneHref } from "@/lib/site-contact";

const FLOAT_ICON_STROKE = 2;
const FLOAT_ICON_CLASS = "size-6 text-charcoal";
const FLOAT_BUTTON_CLASS =
 "flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-white p-0 shadow-[0_4px_20px_rgb(0_0_0/15%)] outline-none transition-transform hover:scale-105 focus:outline-none focus-visible:ring-0 active:scale-95 sm:size-13";

function getScrollThreshold() {
 const hero = document.querySelector(".hero-carousel");
 return hero?.offsetHeight ?? window.innerHeight;
}

export function ContactFloat() {
 const { t } = useTranslations();
 const whatsAppHref = getWhatsAppHref();
 const phoneHref = sitePhoneHref;
 const [showBackToTop, setShowBackToTop] = useState(false);

 const updateBackToTopVisibility = useCallback(() => {
  setShowBackToTop(window.scrollY > getScrollThreshold());
 }, []);

 useEffect(() => {
  updateBackToTopVisibility();
  window.addEventListener("scroll", updateBackToTopVisibility, { passive: true });
  window.addEventListener("resize", updateBackToTopVisibility);

  return () => {
   window.removeEventListener("scroll", updateBackToTopVisibility);
   window.removeEventListener("resize", updateBackToTopVisibility);
  };
 }, [updateBackToTopVisibility]);

 const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
 };

 if (!whatsAppHref && !phoneHref) return null;

 return (
  <div className="fixed right-3 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex flex-col items-end gap-2.5 sm:right-6 sm:bottom-6 sm:gap-3">
   {showBackToTop ? (
    <button
     type="button"
     onClick={scrollToTop}
     className={FLOAT_BUTTON_CLASS}
     aria-label={t("contact.backToTop")}
    >
     <TbArrowUp
      className={FLOAT_ICON_CLASS}
      strokeWidth={FLOAT_ICON_STROKE}
      aria-hidden
     />
    </button>
   ) : null}
   {whatsAppHref ? (
    <Link
     href={whatsAppHref}
     target="_blank"
     rel="noopener noreferrer"
     className={FLOAT_BUTTON_CLASS}
     aria-label={t("contact.whatsapp")}
    >
     <TbBrandWhatsapp
      className={FLOAT_ICON_CLASS}
      strokeWidth={FLOAT_ICON_STROKE}
      aria-hidden
     />
    </Link>
   ) : null}
   {phoneHref ? (
    <Link
     href={phoneHref}
     className={FLOAT_BUTTON_CLASS}
     aria-label={t("contact.call")}
    >
     <TbPhone
      className={FLOAT_ICON_CLASS}
      strokeWidth={FLOAT_ICON_STROKE}
      aria-hidden
     />
    </Link>
   ) : null}
  </div>
 );
}
