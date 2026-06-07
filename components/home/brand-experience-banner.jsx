"use client";

import Image from "next/image";
import Link from "next/link";

const BRAND_BANNER_IMAGE =
 "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2400&q=85";

export function BrandExperienceBanner() {
 return (
  <section className="relative min-h-[420px] overflow-hidden md:min-h-[520px]">
   <Image
    src={BRAND_BANNER_IMAGE}
    alt="Fablessi üretim deneyimi — bahçe mobilyası atölyesi"
    fill
    sizes="100vw"
    className="object-cover"
   />
   <div className="absolute inset-0 bg-black/45" />
   <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
    <p className="text-xs font-semibold tracking-[0.35em] uppercase">
     Üretim Deneyimi
    </p>
    <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight md:text-4xl">
     İnegöl ustalığı, premium bahçe mobilyasında
    </h2>
    <p className="mt-4 max-w-xl text-sm text-white/85 md:text-base">
     Kurumsal sergileme ve katalog mantığıyla tasarlanan altyapımız; detaylı
     ürün bilgileri, görseller ve teknik özelliklerle güçlü bir portföy sunar.
    </p>
    <Link
     href="/hakkimizda"
     className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-charcoal transition hover:bg-white/90"
    >
     Markayı Keşfet
    </Link>
   </div>
  </section>
 );
}
