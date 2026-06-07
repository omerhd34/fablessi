"use client";

import { usePathname } from "next/navigation";
import { DesktopNavbar } from "@/components/layout/desktop-navbar";
import { MobileMenuDrawer } from "@/components/layout/mobile-menu-drawer";
import { MobileNavbar } from "@/components/layout/mobile-navbar";
import { Sheet } from "@/components/ui/sheet";

export function Navbar({
 searchOpen,
 productsMenuOpen,
 menuOpen,
 onMenuOpenChange,
 onProductsMenuOpenChange,
 onSearchToggle,
 onSearchClose,
}) {
 const pathname = usePathname();

 const openMenu = () => {
  onMenuOpenChange(true);
  onProductsMenuOpenChange?.(false);
  onSearchClose?.();
 };

 const closeMenu = () => onMenuOpenChange(false);

 return (
  <>
   <MobileNavbar
    searchOpen={searchOpen}
    onSearchToggle={onSearchToggle}
    onMenuOpen={openMenu}
   />
   <DesktopNavbar
    searchOpen={searchOpen}
    productsMenuOpen={productsMenuOpen}
    onSearchToggle={onSearchToggle}
    onSearchClose={onSearchClose}
    onProductsMenuOpenChange={onProductsMenuOpenChange}
    onMenuOpen={openMenu}
   />

   <Sheet open={menuOpen} onOpenChange={onMenuOpenChange}>
    <MobileMenuDrawer pathname={pathname} onClose={closeMenu} />
   </Sheet>
  </>
 );
}
