"use client";

import { usePathname } from "next/navigation";
import { Menu, Search } from "@/lib/icons";
import { BrandLogoLink } from "@/components/layout/brand-logo";
import { useTranslations } from "@/contexts/locale-provider";
import { useIsDesktopNav } from "@/hooks/use-is-desktop-nav";
import { cn } from "@/lib/utils";

export function MobileNavbar({ searchOpen, onSearchToggle, onMenuOpen }) {
 const isDesktopNav = useIsDesktopNav();
 const pathname = usePathname();
 const isHome = pathname === "/";
 const { t } = useTranslations();

 if (isDesktopNav) return null;

 const searchButton = (
  <button
   type="button"
   onClick={onSearchToggle}
   className={cn(
    "header-pill-circle header-icon-btn nav-compact-search-btn nav-compact-menu-btn shrink-0 cursor-pointer",
    searchOpen && "header-icon-btn--active"
   )}
   aria-label={t("common.search")}
   aria-expanded={searchOpen}
  >
   <Search className="nav-compact-menu-btn__icon" aria-hidden />
  </button>
 );

 const menuButton = (
  <button
   type="button"
   onClick={onMenuOpen}
   className="header-pill-circle header-icon-btn nav-compact-menu-btn shrink-0 cursor-pointer"
   aria-label={t("nav.openMenu")}
  >
   <Menu className="nav-compact-menu-btn__icon" aria-hidden />
  </button>
 );

 return (
  <div className="nav-compact container-premium" aria-label={t("nav.mobileMenu")}>
   <div className="nav-compact-bar">
    <div
     className={cn(
      "nav-compact-bar__logo",
      isHome && "nav-compact-home-logo min-w-0 shrink"
     )}
    >
     <BrandLogoLink size="md" />
    </div>

    <div className="nav-compact-bar__actions">
     {searchButton}
     {menuButton}
    </div>
   </div>
  </div>
 );
}
