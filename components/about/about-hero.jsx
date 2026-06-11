"use client";

import { useTranslations } from "@/contexts/locale-provider";
import { brandFullNameUppercase } from "@/lib/navigation";

export function AboutHero() {
 const { t } = useTranslations();

 return (
  <section className="pt-[calc(var(--header-height-mobile)+2.5rem)] pb-4 sm:pt-[calc(var(--header-height-mobile-sm)+3rem)] lg:pt-[calc(var(--header-height-desktop)+3.25rem)]">
   <div className="container-premium text-center">
    <p className="text-[0.68rem] font-semibold tracking-[0.38em] text-charcoal/50">
     {brandFullNameUppercase}
    </p>
    <h1 className="mt-3 font-display text-[clamp(1.65rem,4vw,2.5rem)] font-semibold tracking-tight text-charcoal">
     {t("about.pageTitle")}
    </h1>
   </div>
  </section>
 );

}
