/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "@/lib/icons";
import { BrandLogoLink } from "@/components/layout/brand-logo";
import { ProductsMegaMenu } from "@/components/layout/products-mega-menu";
import { primaryNavItems } from "@/lib/navigation";
import { useIsDesktopNav } from "@/hooks/use-is-desktop-nav";
import { cn } from "@/lib/utils";

function DesktopNavItem({
 item,
 pathname,
 productsMenuOpen,
 onProductsToggle,
 onProductsClose,
 showDivider,
}) {
 const isProducts = item.megaMenu === "products";
 const active = isProducts
  ? pathname === "/urunler" ||
    pathname.startsWith("/urunler/") ||
    productsMenuOpen
  : pathname === item.href || pathname.startsWith(`${item.href}/`);

 const className = cn(
  "nav-desktop-link header-pill-link",
  active && "nav-desktop-link--active"
 );

 return (
  <>
   {showDivider ? <span className="header-pill-divider" aria-hidden /> : null}
   {isProducts ? (
    <button
     type="button"
     onClick={onProductsToggle}
     aria-expanded={productsMenuOpen}
     aria-haspopup="true"
     className={cn(className, "cursor-pointer")}
    >
     {item.label}
    </button>
   ) : (
    <Link href={item.href} onClick={onProductsClose} className={className}>
     {item.label}
    </Link>
   )}
  </>
 );
}

export function DesktopNavbar({
 productsMenuOpen = false,
 onProductsMenuOpenChange,
 onSearchToggle,
 onSearchClose,
 searchOpen,
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

 const closeProductsMenu = () => setProductsOpenState(false);

 useEffect(() => {
  if (!productsMenuOpen) return;

  const onPointerDown = (event) => {
   if (navRef.current?.contains(event.target)) return;
   setProductsOpenState(false);
  };

  document.addEventListener("pointerdown", onPointerDown);
  return () => document.removeEventListener("pointerdown", onPointerDown);
 }, [productsMenuOpen]);

 if (!isDesktopNav) return null;

 return (
  <div ref={navRef} className="nav-desktop relative" aria-label="Masaüstü menü">
   <div className="container-premium nav-desktop-bar">
    <BrandLogoLink size="lg" className="min-w-0 shrink justify-self-start" />

    <nav
     className="header-pill nav-desktop-links"
     aria-label="Ana navigasyon"
    >
     {primaryNavItems.map((item, index) => (
      <DesktopNavItem
       key={item.href}
       item={item}
       pathname={pathname}
       productsMenuOpen={productsMenuOpen}
       onProductsToggle={toggleProductsMenu}
       onProductsClose={closeProductsMenu}
       showDivider={index > 0}
      />
     ))}
    </nav>

    <div className="nav-desktop-bar__actions justify-self-end">
     <div className="header-pill flex h-11 items-center px-1.5 lg:h-12 lg:px-2 xl:h-[3.35rem]">
      <button
       type="button"
       onClick={onSearchToggle}
       className={cn(
        "header-icon-btn size-10 cursor-pointer rounded-full lg:size-11 xl:size-12",
        searchOpen && "header-icon-btn--active"
       )}
       aria-label="Ara"
       aria-expanded={searchOpen}
      >
       <Search className="size-[1.45rem]" />
      </button>
     </div>

     <button
      type="button"
      className="header-pill-circle header-pill-link size-11 shrink-0 cursor-pointer text-sm font-semibold lg:size-12 lg:text-[0.9375rem] xl:size-[3.35rem]"
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
