"use client";

import { Menu, Search } from "@/lib/icons";
import { BrandLogoLink } from "@/components/layout/brand-logo";
import { useTranslations } from "@/contexts/locale-provider";
import { useIsDesktopNav } from "@/hooks/use-is-desktop-nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function MobileNavbar({ searchOpen, onSearchToggle, onMenuOpen }) {
 const isDesktopNav = useIsDesktopNav();
 const { t } = useTranslations();

 if (isDesktopNav) return null;

 return (
  <div className="nav-compact container-premium" aria-label={t("nav.mobileMenu")}>
   <div className="nav-compact-bar">
    <div className="nav-compact-bar__logo">
     <BrandLogoLink size="xs" className="nav-compact-bar__logo-brand max-w-full" />
    </div>

    <div className="nav-compact-bar__actions">
     <div className="nav-compact-search">
      <button
       type="button"
       onClick={onSearchToggle}
       className={cn(
        "header-pill-circle header-icon-btn nav-compact-search-btn cursor-pointer",
        searchOpen && "header-icon-btn--active"
       )}
       aria-label={t("common.search")}
       aria-expanded={searchOpen}
      >
       <Search className="nav-compact-search-btn__icon" aria-hidden />
      </button>
     </div>

     <Button
      variant="ghost"
      size="icon"
      type="button"
      onClick={onMenuOpen}
      className="header-pill-circle nav-compact-menu-btn shrink-0 hover:bg-transparent"
      aria-label={t("nav.openMenu")}
     >
      <Menu className="nav-compact-menu-btn__icon" aria-hidden />
     </Button>
    </div>
   </div>
  </div>
 );
}
