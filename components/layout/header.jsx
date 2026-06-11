/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { HeaderSearchBar } from "@/components/layout/header-search-bar";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 48;
const HERO_SELECTORS = ".page-header-bleed, .faq-hero";

function isLogoOverHero() {
 const hero = document.querySelector(HERO_SELECTORS);
 if (!hero) return false;

 const logos = document.querySelectorAll(".site-header .brand-logo-image");
 let logo = null;

 for (const candidate of logos) {
  const rect = candidate.getBoundingClientRect();
  if (rect.width > 0 && rect.height > 0) {
   logo = candidate;
   break;
  }
 }

 if (!logo) return true;

 const logoRect = logo.getBoundingClientRect();
 const heroRect = hero.getBoundingClientRect();
 const logoCenterY = logoRect.top + logoRect.height / 2;

 return logoCenterY >= heroRect.top && logoCenterY <= heroRect.bottom;
}

export function Header() {
 const pathname = usePathname();
 const [scrolled, setScrolled] = useState(false);
 const [heroOverlay, setHeroOverlay] = useState(undefined);
 const [productsMenuOpen, setProductsMenuOpen] = useState(false);
 const [searchOpen, setSearchOpen] = useState(false);
 const [menuOpen, setMenuOpen] = useState(false);

 const isHome = pathname === "/";
 const headerHidden =
  isHome && scrolled && !searchOpen && !menuOpen && !productsMenuOpen;

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
    setMenuOpen(false);
   }
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
 }, []);

 useLayoutEffect(() => {
  const updateHeroOverlay = () => {
   const hero = document.querySelector(HERO_SELECTORS);
   if (!hero) {
    setHeroOverlay(undefined);
    return;
   }
   setHeroOverlay(isLogoOverHero());
  };

  updateHeroOverlay();

  window.addEventListener("scroll", updateHeroOverlay, { passive: true });
  window.addEventListener("resize", updateHeroOverlay);

  const hero = document.querySelector(HERO_SELECTORS);
  const heroObserver = hero ? new ResizeObserver(updateHeroOverlay) : null;
  heroObserver?.observe(hero);

  const header = document.querySelector(".site-header");
  const headerObserver = header ? new ResizeObserver(updateHeroOverlay) : null;
  headerObserver?.observe(header);

  return () => {
   window.removeEventListener("scroll", updateHeroOverlay);
   window.removeEventListener("resize", updateHeroOverlay);
   heroObserver?.disconnect();
   headerObserver?.disconnect();
  };
 }, [pathname]);

 useEffect(() => {
  setProductsMenuOpen(false);
  setSearchOpen(false);
  setMenuOpen(false);
 }, [pathname]);

 useEffect(() => {
  if (searchOpen) {
   document.documentElement.dataset.searchOpen = "true";
  } else {
   delete document.documentElement.dataset.searchOpen;
  }

  return () => {
   delete document.documentElement.dataset.searchOpen;
  };
 }, [searchOpen]);

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
   data-home={isHome ? "true" : "false"}
   data-hero-overlay={
    heroOverlay === undefined ? undefined : heroOverlay ? "true" : "false"
   }
   data-search-open={searchOpen ? "true" : "false"}
   data-menu-open={productsMenuOpen || menuOpen || searchOpen ? "true" : "false"}
   data-hidden={headerHidden ? "true" : "false"}
   className={cn(
    "site-header fixed inset-x-0 top-0 transition-[transform,opacity] duration-300 ease-out",
    headerHidden && "-translate-y-full opacity-0 pointer-events-none"
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
