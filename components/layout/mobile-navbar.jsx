"use client";

import { Menu, Search } from "@/lib/icons";
import { BrandLogoLink } from "@/components/layout/brand-logo";
import { useIsDesktopNav } from "@/hooks/use-is-desktop-nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function MobileNavbar({ searchOpen, onSearchToggle, onMenuOpen }) {
 const isDesktopNav = useIsDesktopNav();

 if (isDesktopNav) return null;

 return (
  <div
   className="nav-compact container-premium flex h-20 items-center justify-between gap-3"
   aria-label="Mobil menü"
  >
   <div className="flex items-center gap-2.5">
    <Button
     variant="ghost"
     size="icon"
     type="button"
     onClick={onMenuOpen}
     className="header-pill-circle size-11 shrink-0 hover:bg-transparent"
     aria-label="Menüyü aç"
    >
     <Menu className="size-[1.35rem] text-charcoal" />
    </Button>

    <button
     type="button"
     onClick={onSearchToggle}
     className={cn(
      "header-pill-circle header-icon-btn size-11 cursor-pointer",
      searchOpen && "opacity-70"
     )}
     aria-label="Ara"
     aria-expanded={searchOpen}
    >
     <Search className="size-[1.35rem]" />
    </button>
   </div>

   <BrandLogoLink size="sm" />

   <button
    type="button"
    className="header-pill-circle header-pill-link size-11 shrink-0 cursor-pointer text-sm font-semibold"
    aria-label="Dil: Türkçe"
   >
    TR
   </button>
  </div>
 );
}
