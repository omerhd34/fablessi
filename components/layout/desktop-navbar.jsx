"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search } from "@/lib/icons";
import { BrandLogoLink } from "@/components/layout/brand-logo";
import { ProductsMegaMenu } from "@/components/layout/products-mega-menu";
import { headerQuickLinks } from "@/lib/navigation";
import { useIsDesktopNav } from "@/hooks/use-is-desktop-nav";
import { cn } from "@/lib/utils";

export function DesktopNavbar({
 productsMenuOpen = false,
 onProductsMenuOpenChange,
 onSearchToggle,
 onSearchClose,
 searchOpen,
 onMenuOpen,
}) {
 const pathname = usePathname();
 const isDesktopNav = useIsDesktopNav();
 const navRef = useRef(null);

 const setProductsOpenState = (open) => {
  onProductsMenuOpenChange?.(open);
  if (open) onSearchClose?.();
 };

 const toggleProductsMenu = () => {
  setProductsOpenState(!productsMenuOpen);
 };

 useEffect(() => {
  if (!productsMenuOpen) return;

  const onPointerDown = (event) => {
   if (navRef.current?.contains(event.target)) return;
   setProductsOpenState(false);
  };

  document.addEventListener("pointerdown", onPointerDown);
  return () => document.removeEventListener("pointerdown", onPointerDown);
 }, [productsMenuOpen]);

 const productsActive =
  pathname === "/urunler" ||
  pathname.startsWith("/urunler/") ||
  productsMenuOpen;

 if (!isDesktopNav) return null;

 return (
  <div ref={navRef} className="nav-desktop relative" aria-label="Masaüstü menü">
   <div className="container-premium flex h-22 items-center justify-between gap-4">
    <div className="flex min-w-0 items-center gap-3">
     <button
      type="button"
      onClick={onMenuOpen}
      className="header-pill-circle header-icon-btn size-11 shrink-0 cursor-pointer xl:size-12"
      aria-label="Menüyü aç"
     >
      <Menu className="size-[1.35rem]" />
     </button>

     <div className="header-pill hidden h-11 items-center px-1.5 sm:flex xl:h-12">
      {headerQuickLinks.map((item, index) => (
       <span key={item.href} className="flex items-center">
        {index > 0 ? <span className="header-pill-divider" aria-hidden /> : null}
        {item.megaMenu === "products" ? (
         <button
          type="button"
          onClick={toggleProductsMenu}
          aria-expanded={productsMenuOpen}
          aria-haspopup="true"
          className={cn(
           "header-pill-link cursor-pointer px-3.5 py-2.5 xl:px-5",
           productsActive && "font-semibold"
          )}
         >
          {item.label}
         </button>
        ) : (
         <Link
          href={item.href}
          onClick={() => setProductsOpenState(false)}
          className="header-pill-link px-3.5 py-2.5 xl:px-5"
         >
          {item.label}
         </Link>
        )}
       </span>
      ))}
     </div>
    </div>

    <BrandLogoLink size="md" />

    <div className="flex items-center justify-end gap-3">
     <div className="header-pill flex h-11 items-center px-1.5 xl:h-12">
      <button
       type="button"
       onClick={onSearchToggle}
       className={cn(
        "header-icon-btn size-10 cursor-pointer rounded-full xl:size-11",
        searchOpen && "opacity-70"
       )}
       aria-label="Ara"
       aria-expanded={searchOpen}
      >
       <Search className="size-[1.35rem]" />
      </button>
     </div>

     <button
      type="button"
      className="header-pill-circle header-pill-link size-11 shrink-0 cursor-pointer text-sm font-semibold xl:size-12"
      aria-label="Dil: Türkçe"
     >
      TR
     </button>
    </div>
   </div>

   <ProductsMegaMenu open={productsMenuOpen} />
  </div>
 );
}
