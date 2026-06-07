"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { faqCategoryTabs, faqHeroImage } from "@/lib/faq";
import { cn } from "@/lib/utils";

function getSiteHeaderHeight() {
 const header = document.querySelector(".site-header");
 if (!header) return 0;
 return Math.ceil(header.getBoundingClientRect().height);
}

export function FaqHero() {
 const [headerOffset, setHeaderOffset] = useState(0);

 useEffect(() => {
  const update = () => setHeaderOffset(getSiteHeaderHeight());

  update();

  const header = document.querySelector(".site-header");
  const observer = header ? new ResizeObserver(update) : null;
  observer?.observe(header);

  window.addEventListener("resize", update);
  window.addEventListener("scroll", update, { passive: true });

  return () => {
   observer?.disconnect();
   window.removeEventListener("resize", update);
   window.removeEventListener("scroll", update);
  };
 }, []);

 const scrollToCategory = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
 };

 return (
  <section
   className="relative w-full"
   style={{ marginTop: headerOffset > 0 ? headerOffset : undefined }}
  >
   <div className="relative min-h-[min(58vh,640px)] w-full md:min-h-[min(52vh,560px)] lg:min-h-[min(48vh,520px)]">
    <Image
     src={faqHeroImage}
     alt=""
     fill
     priority
     sizes="100vw"
     className="object-cover object-center"
    />
    <div className="absolute inset-0 bg-black/30" aria-hidden />

    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pb-10 text-center text-white">
     <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
      Sıkça Sorulan Sorular
     </h1>

     <nav
      className="mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-2 md:gap-3"
      aria-label="SSS kategorileri"
     >
      {faqCategoryTabs.map((tab) => (
       <button
        key={tab.id}
        type="button"
        onClick={() => scrollToCategory(tab.id)}
        className={cn(
         "cursor-pointer rounded-full border border-white/35 bg-white/20 px-4 py-2 font-body text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30 md:px-5"
        )}
       >
        {tab.label}
       </button>
      ))}
     </nav>
    </div>
   </div>
  </section>
 );
}
