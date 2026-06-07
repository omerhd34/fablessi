/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { HeaderSearchBar } from "@/components/layout/header-search-bar";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 48;

export function Header() {
 const pathname = usePathname();
 const [scrolled, setScrolled] = useState(false);
 const [productsMenuOpen, setProductsMenuOpen] = useState(false);
 const [searchOpen, setSearchOpen] = useState(false);
 const [menuOpen, setMenuOpen] = useState(false);

 const isHome = pathname === "/";
 const compact = !isHome;
 const headerHidden = isHome && scrolled && !searchOpen && !menuOpen;

 const toggleSearch = () => {
  setSearchOpen((prev) => {
   const next = !prev;
   if (next) setProductsMenuOpen(false);
   return next;
  });
 };

 useEffect(() => {
  const onScroll = () => {
   const next = window.scrollY > SCROLL_THRESHOLD;
   setScrolled(next);
   if (next) {
    setProductsMenuOpen(false);
    setSearchOpen(false);
    setMenuOpen(false);
   }
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
 }, []);

 useEffect(() => {
  setProductsMenuOpen(false);
  setSearchOpen(false);
  setMenuOpen(false);
 }, [pathname]);

 useEffect(() => {
  if (!searchOpen && !productsMenuOpen) return;

  const onKeyDown = (event) => {
   if (event.key !== "Escape") return;
   if (searchOpen) setSearchOpen(false);
   if (productsMenuOpen) setProductsMenuOpen(false);
  };

  window.addEventListener("keydown", onKeyDown);
  return () => window.removeEventListener("keydown", onKeyDown);
 }, [searchOpen, productsMenuOpen]);

 return (
  <header
   data-search-open={searchOpen ? "true" : "false"}
   data-compact={compact ? "true" : "false"}
   data-hidden={headerHidden ? "true" : "false"}
   className={cn(
    "site-header fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow,opacity] duration-300 ease-out",
    headerHidden && "-translate-y-full opacity-0 pointer-events-none",
    compact && !headerHidden
     ? "bg-white/95 shadow-[0_1px_0_rgb(0_0_0/6%)] backdrop-blur-md"
     : "bg-transparent shadow-none"
   )}
  >
   <Navbar
    searchOpen={searchOpen}
    productsMenuOpen={productsMenuOpen}
    menuOpen={menuOpen}
    onMenuOpenChange={setMenuOpen}
    onProductsMenuOpenChange={setProductsMenuOpen}
    onSearchToggle={toggleSearch}
    onSearchClose={() => setSearchOpen(false)}
   />
   <HeaderSearchBar open={searchOpen} onClose={() => setSearchOpen(false)} />
  </header>
 );
}
