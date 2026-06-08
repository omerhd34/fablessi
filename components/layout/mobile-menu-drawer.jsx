"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import {
 ChevronLeft,
 ChevronRight,
 CloseIcon,
 Collections,
 Explore,
 MapPin,
 SupportAgent,
 ViewModule,
 Work,
} from "@/lib/icons";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { MobileProductsCategoryGrid } from "@/components/layout/mobile-products-category-grid";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/contexts/locale-provider";
import { brandName } from "@/lib/navigation";
import {
 SheetClose,
 SheetContent,
 SheetHeader,
 SheetTitle,
} from "@/components/ui/sheet";

const mobileNavIconMap = {
 products: ViewModule,
 explore: Explore,
 collections: Collections,
 projects: Work,
 stores: MapPin,
 contact: SupportAgent,
};

export function MobileMenuDrawer({ pathname, onClose }) {
 const [productsViewOpen, setProductsViewOpen] = useState(false);
 const { navigation, t } = useTranslations();
 const { mobileNavSections } = navigation;

 return (
  <SheetContent
   side="left"
   showCloseButton={false}
   className="mobile-nav-sheet flex flex-col p-0 text-charcoal data-open:animate-none data-closed:animate-none"
  >
   <SheetHeader className="sr-only">
    <SheetTitle>
     {productsViewOpen
      ? t("nav.productCategories")
      : t("nav.mainMenuTitle", { brand: brandName })}
    </SheetTitle>
   </SheetHeader>

   <div className="flex shrink-0 justify-end px-5 pt-5 pb-2">
    <SheetClose asChild>
     <button
      type="button"
      className="-mr-1.5 flex size-10 cursor-pointer items-center justify-center rounded-full text-charcoal/70 transition-colors hover:bg-charcoal/6 hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal/15"
      aria-label={t("nav.closeMenu")}
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
      <ViewModule className="size-5 shrink-0 text-charcoal/45" aria-hidden />
      {t("nav.products")}
     </button>

     <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
      <MobileProductsCategoryGrid onClose={onClose} />
     </div>
    </div>
   ) : (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
     <nav
      className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5"
      aria-label={t("nav.mainNav")}
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
           t={t}
          />
         ))}
        </ul>
       </Fragment>
      ))}
     </nav>

     <div className="shrink-0 border-t border-charcoal/8 px-5 py-4">
      <LocaleSwitcher variant="mobile" />
     </div>
    </div>
   )}
  </SheetContent>
 );
}

function MobileDrawerNavItem({
 item,
 pathname,
 onClose,
 onOpenProductsMenu,
 t,
}) {
 const active =
  pathname === item.href || pathname.startsWith(`${item.href}/`);
 const isProductsMenu = item.megaMenu === "products";
 const Icon = item.icon ? mobileNavIconMap[item.icon] : null;

 if (isProductsMenu) {
  return (
   <li className="mobile-nav-item border-b border-charcoal/8 last:border-b-0">
    <button
     type="button"
     onClick={onOpenProductsMenu}
     className={cn(
      "flex min-h-13 w-full cursor-pointer items-center gap-3 py-3.5 text-left text-[0.9375rem] font-medium transition-colors hover:text-charcoal",
      active ? "text-charcoal" : "text-charcoal/90"
     )}
     aria-label={t("nav.openProductCategories")}
    >
     {Icon ? (
      <Icon className="size-5 shrink-0 text-charcoal/45" aria-hidden />
     ) : null}
     <span className="flex-1">{item.label}</span>
     <ChevronRight
      className="size-4 shrink-0 text-charcoal/35"
      aria-hidden
     />
    </button>
   </li>
  );
 }

 return (
  <li className="mobile-nav-item border-b border-charcoal/8 last:border-b-0">
   <Link
    href={item.href}
    onClick={onClose}
    className={cn(
     "flex min-h-13 cursor-pointer items-center gap-3 py-3.5 text-[0.9375rem] font-medium transition-colors hover:text-charcoal",
     active ? "text-charcoal" : "text-charcoal/90"
    )}
   >
    {Icon ? (
     <Icon className="size-5 shrink-0 text-charcoal/45" aria-hidden />
    ) : null}
    {item.label}
   </Link>
  </li>
 );
}
