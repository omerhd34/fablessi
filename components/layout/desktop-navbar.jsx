/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Collections, Mail, MapPin, Search, ViewModule, Work } from "@/lib/icons";
import { BrandLogoLink } from "@/components/layout/brand-logo";
import { ProductsMegaMenu } from "@/components/layout/products-mega-menu";
import { primaryNavItems } from "@/lib/navigation";
import { useIsDesktopNav } from "@/hooks/use-is-desktop-nav";
import { cn } from "@/lib/utils";

const desktopNavIconMap = {
 products: ViewModule,
 collections: Collections,
 projects: Work,
 stores: MapPin,
 contact: Mail,
};

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

 const Icon = item.icon ? desktopNavIconMap[item.icon] : null;
 const iconOnly = Boolean(item.iconOnly);
 const content = (
  <>
   {Icon ? (
    <Icon
     className={cn(
      "nav-desktop-link__icon",
      iconOnly && "nav-desktop-link__icon--solo"
     )}
     aria-hidden
    />
   ) : null}
   {iconOnly ? null : item.label}
  </>
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
     aria-label={iconOnly ? item.label : undefined}
     className={cn(className, iconOnly && "nav-desktop-link--icon-only", "cursor-pointer")}
    >
     {content}
    </button>
   ) : (
    <Link
     href={item.href}
     onClick={onProductsClose}
     aria-label={iconOnly ? item.label : undefined}
     className={cn(className, iconOnly && "nav-desktop-link--icon-only")}
    >
     {content}
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
    <BrandLogoLink size="xl" className="nav-desktop-bar__logo min-w-0 shrink" />

    <nav
     className="header-pill nav-desktop-pill"
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

     <span className="header-pill-divider" aria-hidden />

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

     <span className="header-pill-divider" aria-hidden />

     <button
      type="button"
      className="header-pill-link flex size-10 cursor-pointer items-center justify-center rounded-full text-sm font-semibold lg:size-11 lg:text-[0.9375rem] xl:size-12"
      aria-label="Dil: Türkçe"
     >
      TR
     </button>
    </nav>
   </div>

   <ProductsMegaMenu open={productsMenuOpen} />
  </div>
 );
}
