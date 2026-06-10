"use client";

import Link from "next/link";
import { useState } from "react";
import {
 ChevronLeft,
 CloseIcon,
 HeroChevronRight,
 Collections,
 Explore,
 Heart,
 HeartFilled,
 HelpOutline,
 Home,
 MapPin,
 MissionVision,
 SupportAgent,
 ViewModule,
 Work,
} from "@/lib/icons";
import { useFavorites } from "@/contexts/favorites-provider";
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
 home: Home,
 products: ViewModule,
 explore: Explore,
 favorites: Heart,
 collections: Collections,
 projects: Work,
 stores: MapPin,
 mission: MissionVision,
 faq: HelpOutline,
 contact: SupportAgent,
};

export function MobileMenuDrawer({ pathname, onClose }) {
 const [productsViewOpen, setProductsViewOpen] = useState(false);
 const { navigation, t } = useTranslations();
 const mobileNavSection = navigation.mobileNavSections[0];
 const mobileNavItems = mobileNavSection?.items ?? [];

 return (
  <SheetContent
   side="left"
   showCloseButton={false}
   className="mobile-nav-sheet flex flex-col bg-transparent! p-0 data-open:animate-none data-closed:animate-none"
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
      className="mobile-nav-sheet__close -mr-1.5 flex size-10 cursor-pointer items-center justify-center rounded-full"
      aria-label={t("nav.closeMenu")}
     >
      <CloseIcon
       className="mobile-nav-sheet__close-icon size-5 shrink-0"
       strokeWidth={3.25}
       aria-hidden
      />
     </button>
    </SheetClose>
   </div>

   {productsViewOpen ? (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden pb-6">
     <button
      type="button"
      onClick={() => setProductsViewOpen(false)}
      className="mobile-nav-sheet__back mx-5 mb-4 flex cursor-pointer items-center gap-2 border-b pb-4 text-left"
     >
      <ChevronLeft className="mobile-nav-sheet__icon size-5 shrink-0" aria-hidden />
      <ViewModule className="mobile-nav-sheet__icon size-5 shrink-0" aria-hidden />
      {t("nav.products")}
     </button>

     <div className="mobile-nav-sheet__scroll min-h-0 flex-1 overflow-y-auto overscroll-contain">
      <div className="mobile-nav-sheet__scroll-inner">
       <MobileProductsCategoryGrid onClose={onClose} />
      </div>
     </div>
    </div>
   ) : (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
     <nav
      className="mobile-nav-sheet__scroll flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain"
      aria-label={t("nav.mainNav")}
     >
      <ul className="mobile-nav-sheet__scroll-inner flex flex-col">
       {mobileNavItems.map((item) =>
        item.href === "/favoriler" ? (
         <MobileDrawerFavoritesItem
          key={item.href}
          pathname={pathname}
          onClose={onClose}
          t={t}
         />
        ) : (
         <MobileDrawerNavItem
          key={item.href}
          item={item}
          pathname={pathname}
          onClose={onClose}
          onOpenProductsMenu={() => setProductsViewOpen(true)}
          t={t}
         />
        )
       )}
      </ul>
     </nav>

     <div className="mobile-nav-sheet__footer shrink-0 border-t px-5 py-4">
      <LocaleSwitcher variant="mobile" />
     </div>
    </div>
   )}
  </SheetContent>
 );
}

function MobileDrawerFavoritesItem({ pathname, onClose, t }) {
 const { count, hydrated } = useFavorites();
 const active =
  pathname === "/favoriler" || pathname.startsWith("/favoriler/");
 const visibleCount = hydrated ? count : 0;

 return (
  <li className="mobile-nav-item border-b last:border-b-0">
   <Link
    href="/favoriler"
    onClick={onClose}
    className={cn(
     "mobile-nav-sheet__link flex min-h-14 cursor-pointer items-center gap-3 px-0 py-4 text-[0.9375rem] font-medium",
     active && "mobile-nav-sheet__link--active"
    )}
    aria-label={t("favorites.navLabel", { count: visibleCount })}
    aria-current={active ? "page" : undefined}
   >
    {visibleCount > 0 ? (
     <HeartFilled className="mobile-nav-sheet__icon size-5 shrink-0" aria-hidden />
    ) : (
     <Heart className="mobile-nav-sheet__icon size-5 shrink-0" aria-hidden />
    )}
    <span className="flex-1">{t("nav.favorites")}</span>
   </Link>
  </li>
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
  item.href === "/"
   ? pathname === "/"
   : pathname === item.href || pathname.startsWith(`${item.href}/`);
 const isProductsMenu = item.megaMenu === "products";
 const Icon = item.icon ? mobileNavIconMap[item.icon] : null;

 if (isProductsMenu) {
  return (
   <li className="mobile-nav-item border-b last:border-b-0">
    <button
     type="button"
     onClick={onOpenProductsMenu}
     className={cn(
      "mobile-nav-sheet__link flex min-h-14 w-full cursor-pointer items-center gap-3 px-0 py-4 text-left text-[0.9375rem] font-medium",
      active && "mobile-nav-sheet__link--active"
     )}
     aria-label={t("nav.openProductCategories")}
    >
     {Icon ? (
      <Icon className="mobile-nav-sheet__icon size-5 shrink-0" aria-hidden />
     ) : null}
     <span className="flex-1">{item.label}</span>
     <HeroChevronRight
      className="mobile-nav-sheet__chevron size-4 shrink-0"
      strokeWidth={3.5}
      aria-hidden
     />
    </button>
   </li>
  );
 }

 return (
  <li className="mobile-nav-item border-b last:border-b-0">
   <Link
    href={item.href}
    onClick={onClose}
    className={cn(
     "mobile-nav-sheet__link flex min-h-14 cursor-pointer items-center gap-3 px-0 py-4 text-[0.9375rem] font-medium",
     active && "mobile-nav-sheet__link--active"
    )}
   >
    {Icon ? (
     <Icon className="mobile-nav-sheet__icon size-5 shrink-0" aria-hidden />
    ) : null}
    {item.label}
   </Link>
  </li>
 );
}
