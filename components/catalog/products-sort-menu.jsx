"use client";

import { useState } from "react";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, X } from "@/lib/icons";
import { cn } from "@/lib/utils";

export const sortOptions = [
 { value: "featured", label: "Öne Çıkan" },
 { value: "newest", label: "En Yeni Gelenler" },
 { value: "name-asc", label: "Adı (A'dan > Z'ye)" },
 { value: "name-desc", label: "Adı (Z'den > A'ya)" },
];

export function ProductsSortMenu({ sort, onSortChange }) {
 const [open, setOpen] = useState(false);
 const activeOption =
  sortOptions.find((option) => option.value === sort) ?? sortOptions[0];

 return (
  <div className="shrink-0 self-end lg:self-auto">
   <DropdownMenu open={open} onOpenChange={setOpen}>
    <DropdownMenuTrigger asChild>
     <button
      type="button"
      aria-label="Sıralama seçenekleri"
      aria-expanded={open}
      className={cn(
       "flex h-11 min-w-38 cursor-pointer items-center justify-between gap-3 rounded-full border border-charcoal/12 bg-white py-0 pr-3.5 pl-4 text-sm font-medium text-charcoal shadow-[0_1px_2px_rgb(0_0_0/4%)] outline-none transition hover:border-charcoal/20 hover:shadow-[0_2px_8px_rgb(0_0_0/6%)] focus-visible:border-charcoal/25 focus-visible:ring-2 focus-visible:ring-charcoal/10 data-[state=open]:border-charcoal/20 data-[state=open]:shadow-[0_4px_16px_rgb(0_0_0/8%)]"
      )}
     >
      <span className="truncate">{activeOption.label}</span>
      <ChevronDownIcon
       className={cn(
        "size-4 shrink-0 text-charcoal/65 transition-transform duration-200",
        open && "rotate-180"
       )}
       aria-hidden
      />
     </button>
    </DropdownMenuTrigger>

    <DropdownMenuContent
     align="end"
     sideOffset={10}
     className="w-[min(18rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-charcoal/10 bg-white p-0 shadow-[0_12px_40px_rgb(0_0_0/10%)] ring-0"
    >
     <div className="flex items-center justify-between border-b border-charcoal/8 px-4 py-3.5">
      <p className="text-sm font-semibold text-charcoal">Sırala</p>
      <button
       type="button"
       onClick={() => setOpen(false)}
       className="flex size-8 cursor-pointer items-center justify-center rounded-full text-charcoal/45 transition hover:bg-charcoal/5 hover:text-charcoal"
       aria-label="Kapat"
      >
       <X className="size-4" />
      </button>
     </div>

     <div className="p-2">
      {sortOptions.map((option) => {
       const active = sort === option.value;

       return (
        <DropdownMenuItem
         key={option.value}
         onSelect={() => {
          onSortChange(option.value);
          setOpen(false);
         }}
         className={cn(
          "cursor-pointer rounded-xl px-3 py-2.5 text-sm text-charcoal/75 transition-colors focus:bg-cream/80",
          active && "bg-cream/70 font-semibold text-charcoal"
         )}
        >
         {option.label}
        </DropdownMenuItem>
       );
      })}
     </div>
    </DropdownMenuContent>
   </DropdownMenu>
  </div>
 );
}
