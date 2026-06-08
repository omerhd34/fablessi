"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import { ChevronLeft, ChevronRight, CloseIcon } from "@/lib/icons";
import { MobileProductsCategoryGrid } from "@/components/layout/mobile-products-category-grid";
import { cn } from "@/lib/utils";
import { brandName, mobileNavSections } from "@/lib/navigation";
import {
 SheetClose,
 SheetContent,
 SheetHeader,
 SheetTitle,
} from "@/components/ui/sheet";

export function MobileMenuDrawer({ pathname, onClose }) {
 const [productsViewOpen, setProductsViewOpen] = useState(false);

 return (
  <SheetContent
   side="left"
   showCloseButton={false}
   className="mobile-nav-sheet flex flex-col p-0 text-charcoal data-open:animate-none data-closed:animate-none"
  >
   <SheetHeader className="sr-only">
    <SheetTitle>
     {productsViewOpen ? "Ürün kategorileri" : `Ana menü — ${brandName}`}
    </SheetTitle>
   </SheetHeader>

   <div className="shrink-0 px-5 pt-5 pb-2">
    <SheetClose asChild>
     <button
      type="button"
      className="-ml-1.5 flex size-10 cursor-pointer items-center justify-center rounded-full text-charcoal/70 transition-colors hover:bg-charcoal/6 hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal/15"
      aria-label="Menüyü kapat"
     >
      <CloseIcon className="size-5 shrink-0 stroke-[1.75]" aria-hidden />
     </button>
    </SheetClose>
   </div>

   {productsViewOpen ? (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-5 pb-6">
     <button
      type="button"
      onClick={() => setProductsViewOpen(false)}
      className="mb-4 flex cursor-pointer items-center gap-2 border-b border-charcoal/8 pb-4 text-left text-[0.9375rem] font-semibold text-charcoal"
     >
      <ChevronLeft className="size-5 shrink-0 text-charcoal/50" aria-hidden />
      Ürünler
     </button>

     <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
      <MobileProductsCategoryGrid onClose={onClose} />
     </div>
    </div>
   ) : (
    <nav
     className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5 pb-6"
     aria-label="Ana menü"
    >
     {mobileNavSections.map((section, sectionIndex) => (
      <Fragment key={sectionIndex}>
       {section.divider ? (
        <div className="mobile-nav-divider my-1.5" aria-hidden />
       ) : null}
       <ul className="flex flex-col">
        {section.items.map((item) => (
         <MobileDrawerNavItem
          key={item.href}
          item={item}
          pathname={pathname}
          onClose={onClose}
          onOpenProductsMenu={() => setProductsViewOpen(true)}
         />
        ))}
       </ul>
      </Fragment>
     ))}
    </nav>
   )}
  </SheetContent>
 );
}

function MobileDrawerNavItem({
 item,
 pathname,
 onClose,
 onOpenProductsMenu,
}) {
 const active =
  pathname === item.href || pathname.startsWith(`${item.href}/`);
 const isProductsMenu = item.megaMenu === "products";

 return (
  <li className="mobile-nav-item border-b border-charcoal/8 last:border-b-0">
   <div
    className={cn(
     "flex min-h-13 items-center",
     active ? "text-charcoal" : "text-charcoal/90"
    )}
   >
    <Link
     href={item.href}
     onClick={onClose}
     className="flex flex-1 cursor-pointer items-center py-3.5 text-[0.9375rem] font-medium transition-colors hover:text-charcoal"
    >
     {item.label}
    </Link>
    {isProductsMenu ? (
     <button
      type="button"
      onClick={onOpenProductsMenu}
      className="flex size-11 shrink-0 cursor-pointer items-center justify-end transition-colors hover:text-charcoal"
      aria-label="Ürün kategorilerini aç"
     >
      <ChevronRight
       className="size-4 shrink-0 text-charcoal/35"
       aria-hidden
      />
     </button>
    ) : null}
   </div>
  </li>
 );
}
