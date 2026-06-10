"use client";

import Link from "next/link";
import { SocialIcon } from "@/components/layout/social-icon";
import { FaLocationArrow, FaWhatsapp, Mail, Phone } from "@/lib/icons";
import { getWhatsAppHref, socialLinks } from "@/lib/site-contact";
import { useMemo } from "react";
import { useTranslations } from "@/contexts/locale-provider";
import { getFlagshipStore } from "@/lib/stores";

function getInstagramLabel(href) {
 if (!href) return "Instagram";

 try {
  const match = href.match(/instagram\.com\/([^/?]+)/i);
  if (match?.[1]) return `@${match[1]}`;
 } catch {
  // ignore malformed URLs
 }

 return "Instagram";
}

const contactLinkClassName =
 "inline-flex items-center gap-2.5 text-charcoal/85 transition-colors hover:text-charcoal";

export function StoreShowcase() {
 const { t, locale, dictionary } = useTranslations();
 const store = useMemo(
  () => getFlagshipStore(locale, dictionary),
  [locale, dictionary]
 );
 const whatsAppHref = getWhatsAppHref();

 return (
  <div className="space-y-10 md:space-y-12">
   <h1 className="text-center text-2xl font-semibold tracking-tight text-charcoal md:text-3xl">
    {t("contact.title")}
   </h1>

   <div className="store-showcase-grid grid gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
    <div className="store-showcase-info flex min-w-0 flex-col lg:h-full">
     <div className="flex flex-1 flex-col text-sm leading-relaxed text-charcoal/85 md:text-[0.95rem]">
      <div className="space-y-4">
      <h2 className="font-display text-base font-semibold tracking-[0.18em] text-charcoal uppercase md:text-lg">
       {store.name}
      </h2>

      <p>{store.address}</p>

      <div className="space-y-1">
       {store.hours.map((row) => (
        <p key={row.label}>
         {row.label}: {row.hours}
        </p>
       ))}
      </div>

      <div className="flex flex-col gap-3 pt-1">
       {store.phoneHref ? (
        <Link href={store.phoneHref} className={contactLinkClassName}>
         <Phone className="size-5 shrink-0 text-charcoal/50" aria-hidden />
         <span>{store.phone}</span>
        </Link>
       ) : null}
       {whatsAppHref ? (
        <Link
         href={whatsAppHref}
         target="_blank"
         rel="noopener noreferrer"
         className={contactLinkClassName}
        >
         <FaWhatsapp className="size-5 shrink-0 text-charcoal/50" aria-hidden />
         <span>{store.phone}</span>
        </Link>
       ) : null}
       {store.email ? (
        <Link
         href={`mailto:${store.email}`}
         className={contactLinkClassName}
        >
         <Mail className="size-5 shrink-0 text-charcoal/50" aria-hidden />
         <span>{store.email}</span>
        </Link>
       ) : null}
       {socialLinks
        .filter((item) => item.href)
        .map((item) => (
         <Link
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={contactLinkClassName}
         >
          <SocialIcon
           label={item.label}
           className="size-5 shrink-0 text-charcoal/50"
          />
          <span>{getInstagramLabel(item.href)}</span>
         </Link>
        ))}
      </div>
      </div>

      <div className="mt-auto flex justify-end border-t border-charcoal/10 pt-4">
      <Link
       href={store.mapUrl}
       target="_blank"
       rel="noopener noreferrer"
       className="inline-flex items-center gap-1.5 font-display text-[0.65rem] tracking-[0.22em] text-charcoal/70 uppercase transition-colors hover:text-charcoal"
      >
       <FaLocationArrow className="size-3.5 shrink-0" aria-hidden />
       {t("contact.viewOnMap")}
      </Link>
      </div>
     </div>
    </div>

    <div className="store-map">
     <iframe
      title={t("contact.mapLocation", { name: store.name })}
      src={store.mapEmbedUrl}
      className="store-map__embed"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
     />
    </div>
   </div>
  </div>
 );
}
