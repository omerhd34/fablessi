/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { TbArrowUp, TbBrandWhatsapp, TbPhone } from "react-icons/tb";
import { useTranslations } from "@/contexts/locale-provider";
import { getWhatsAppHref, sitePhoneHref } from "@/lib/site-contact";
const FLOAT_ICON_STROKE = 3;
const FLOAT_BUTTON_CLASS =
 "contact-float-btn header-icon-btn shrink-0 cursor-pointer";
const FLOAT_ICON_CLASS = "contact-float-btn__icon";

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
  <div className="contact-float pointer-events-none fixed z-50">
   <div className="contact-float__stack pointer-events-auto">
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
   </div>
  </div>
 );
}
