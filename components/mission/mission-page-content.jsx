"use client";

import Image from "next/image";
import Link from "next/link";
import { DynamicReactIcon } from "@/components/ui/dynamic-react-icon";
import { useTranslations } from "@/contexts/locale-provider";

export function MissionPageContent() {
 const { dictionary } = useTranslations();
 const { missionVision } = dictionary;

 return (
  <>
   <section className="mission-intro pb-12 md:pb-14">
    <div className="container-premium">
     <p className="mx-auto max-w-2xl text-center font-body text-sm leading-relaxed text-charcoal/75 md:text-[0.95rem]">
      {missionVision.intro}
     </p>
    </div>
   </section>

   <section className="mission-statements section-padding-sm">
    <div className="container-premium">
     <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
      <article className="mission-statement rounded-2xl px-7 py-9 md:px-9 md:py-10">
       <h2 className="font-display text-[clamp(1rem,2.2vw,1.35rem)] font-normal tracking-[0.32em] text-charcoal uppercase">
        {missionVision.missionTitle}
       </h2>
       <p className="mt-6 font-body text-sm leading-[1.85] text-charcoal/78 md:text-[0.95rem]">
        {missionVision.missionText}
       </p>
      </article>

      <article className="mission-statement rounded-2xl px-7 py-9 md:px-9 md:py-10">
       <h2 className="font-display text-[clamp(1rem,2.2vw,1.35rem)] font-normal tracking-[0.32em] text-charcoal uppercase">
        {missionVision.visionTitle}
       </h2>
       <p className="mt-6 font-body text-sm leading-[1.85] text-charcoal/78 md:text-[0.95rem]">
        {missionVision.visionText}
       </p>
      </article>
     </div>
    </div>
   </section>

   <section
    className="mission-visual section-padding-sm"
    aria-hidden
   >
    <div className="container-premium">
     <div className="mission-visual__image relative aspect-16/9 overflow-hidden rounded-2xl sm:aspect-21/9">
      <Image
       src="/velar-oturma/01.jpg"
       alt=""
       fill
       sizes="(max-width: 1280px) 100vw, 1200px"
       className="object-cover object-center"
      />
     </div>
    </div>
   </section>

   <section
    className="mission-values section-padding-sm"
    aria-labelledby="mission-values-heading"
   >
    <div className="container-premium">
     <h2
      id="mission-values-heading"
      className="text-center font-display text-[clamp(1rem,2.2vw,1.35rem)] font-normal tracking-[0.32em] text-charcoal uppercase"
     >
      {missionVision.valuesTitle}
     </h2>

     <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {missionVision.values.map((value) => (
       <article
        key={value.title}
        className="mission-value rounded-2xl px-6 py-8 text-center"
       >
        <div className="mission-value__icon mx-auto" aria-hidden>
         <DynamicReactIcon
          name={value.icon}
          className="size-6 text-charcoal/70"
         />
        </div>
        <h3 className="mt-5 font-display text-[0.72rem] tracking-[0.24em] text-charcoal uppercase">
         {value.title}
        </h3>
        <p className="mt-4 font-body text-sm leading-relaxed text-charcoal/72">
         {value.description}
        </p>
       </article>
      ))}
     </div>
    </div>
   </section>

   <section
    className="mission-commitments pb-16 md:pb-20"
    aria-labelledby="mission-commitments-heading"
   >
    <div className="container-premium">
     <div className="mx-auto max-w-2xl text-center">
      <h2
       id="mission-commitments-heading"
       className="font-display text-[clamp(1rem,2.2vw,1.35rem)] font-normal tracking-[0.32em] text-charcoal uppercase"
      >
       {missionVision.commitmentsTitle}
      </h2>
      <ul className="mt-8 space-y-4 text-left md:text-center">
       {missionVision.commitments.map((item) => (
        <li
         key={item}
         className="font-body text-sm leading-relaxed text-charcoal/75 md:text-[0.95rem]"
        >
         {item}
        </li>
       ))}
      </ul>
     </div>
    </div>
   </section>

   <section className="container-premium pb-20 md:pb-28">
    <div className="mission-cta rounded-2xl px-6 py-10 text-center text-white md:px-10 md:py-12">
     <h2 className="font-display text-[clamp(1rem,2.2vw,1.35rem)] font-normal tracking-[0.28em] uppercase">
      {missionVision.ctaTitle}
     </h2>
     <p className="mx-auto mt-4 max-w-xl font-body text-sm leading-relaxed text-white/82 md:text-[0.95rem]">
      {missionVision.ctaDescription}
     </p>
     <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
      <Link
       href="/urunler"
       className="inline-flex h-11 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-charcoal transition hover:bg-white/92"
      >
       {missionVision.ctaProducts}
      </Link>
      <Link
       href="/iletisim"
       className="inline-flex h-11 items-center justify-center rounded-full border border-white/35 px-8 text-sm font-semibold text-white transition hover:bg-white/10"
      >
       {missionVision.ctaContact}
      </Link>
     </div>
    </div>
   </section>
  </>
 );
}
