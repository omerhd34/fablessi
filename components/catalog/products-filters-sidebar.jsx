"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDownIcon } from "@/lib/icons";
import { catalogColorOrder, catalogColorSwatches } from "@/lib/catalog-colors";
import { productsMegaMenu } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function FilterSection({ title, defaultOpen = true, children }) {
 const [open, setOpen] = useState(defaultOpen);

 return (
  <div className="border-b border-charcoal/10 py-4 first:pt-0 last:border-b-0">
   <button
    type="button"
    onClick={() => setOpen((value) => !value)}
    className="flex w-full cursor-pointer items-center justify-between gap-3 text-left"
   >
    <span className="text-sm font-semibold text-charcoal">{title}</span>
    <ChevronDownIcon
     className={cn(
      "size-4 shrink-0 text-charcoal/40 transition-transform duration-200",
      open && "rotate-180"
     )}
    />
   </button>
   {open ? <div className="mt-4">{children}</div> : null}
  </div>
 );
}

export function ProductsFiltersSidebar({
 categorySlug,
 selectedColor,
 onColorChange,
 availableColors,
 className,
}) {
 const { groups } = productsMegaMenu;

 return (
  <aside className={cn("shrink-0 lg:w-56 xl:w-60", className)}>
   <FilterSection title="Kategori" defaultOpen>
    <ul className="space-y-1">
     <li>
      <Link
       href="/urunler"
       className={cn(
        "block cursor-pointer rounded-lg px-2.5 py-2 text-sm transition-colors",
        !categorySlug
         ? "font-semibold text-charcoal"
         : "text-charcoal/65 hover:text-charcoal"
       )}
      >
       Tüm ürünler
      </Link>
     </li>
     {groups.map((group) => (
      <li key={group.slug}>
       <Link
        href={group.href}
        className={cn(
         "block cursor-pointer rounded-lg px-2.5 py-2 text-sm transition-colors",
         categorySlug === group.slug
          ? "font-semibold text-charcoal"
          : "text-charcoal/65 hover:text-charcoal"
        )}
       >
        {group.label}
       </Link>
      </li>
     ))}
    </ul>
   </FilterSection>

   {availableColors.length > 0 ? (
    <FilterSection title="Renk" defaultOpen>
     <div className="grid grid-cols-4 gap-2.5">
      {catalogColorOrder
       .filter((color) => availableColors.includes(color))
       .map((color) => {
        const active = selectedColor === color;

        return (
         <button
          key={color}
          type="button"
          title={color}
          onClick={() => onColorChange(active ? null : color)}
          className={cn(
           "mx-auto flex size-9 cursor-pointer items-center justify-center rounded-full border-2 transition-transform hover:scale-105",
           active ? "border-charcoal" : "border-transparent"
          )}
          aria-label={color}
          aria-pressed={active}
         >
          <span
           className="block size-7 rounded-full border border-charcoal/10"
           style={{ backgroundColor: catalogColorSwatches[color] ?? "#ccc" }}
          />
         </button>
        );
       })}
     </div>
    </FilterSection>
   ) : null}
  </aside>
 );
}
