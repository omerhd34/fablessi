"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useTranslations } from "@/contexts/locale-provider";

export function MobileProductsCategoryGrid({ onClose }) {
 const { navigation } = useTranslations();
 const menuCategories = useMemo(
  () =>
   navigation.productsMegaMenu.groups.map((group) => ({
    slug: group.slug,
    label: group.label,
    href: group.href,
    image: group.items[0]?.image,
   })),
  [navigation]
 );

 return (
  <div className="grid grid-cols-2 gap-3 pb-2">
   {menuCategories.map((category) => (
    <Link
     key={category.slug}
     href={category.href}
     onClick={onClose}
     className="group relative block aspect-4/5 overflow-hidden rounded-2xl bg-cream/60"
    >
     {category.image ? (
      <>
       <Image
        src={category.image}
        alt={category.label}
        fill
        sizes="45vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
       />
       <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 via-black/5 to-transparent" />
       <span className="absolute bottom-3.5 left-3.5 text-sm font-semibold text-white drop-shadow-[0_1px_8px_rgb(0_0_0/45%)]">
        {category.label}
       </span>
      </>
     ) : null}
    </Link>
   ))}
  </div>
 );
}
