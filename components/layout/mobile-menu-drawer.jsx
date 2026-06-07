"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import { ChevronRight, X } from "@/lib/icons";
import { cn } from "@/lib/utils";
import {
 brandName,
 getMobileSubmenuItems,
 mobileNavSections,
} from "@/lib/navigation";
import {
 SheetClose,
 SheetContent,
 SheetHeader,
 SheetTitle,
} from "@/components/ui/sheet";

export function MobileMenuDrawer({ pathname, onClose }) {
 return (
  <SheetContent
   side="left"
   showCloseButton={false}
   className="mobile-nav-sheet flex flex-col p-0 text-charcoal data-open:animate-none data-closed:animate-none"
  >
   <SheetHeader className="sr-only">
    <SheetTitle>Ana menü — {brandName}</SheetTitle>
   </SheetHeader>

   <div className="shrink-0 px-5 pt-5 pb-2">
    <SheetClose asChild>
     <button
      type="button"
      className="flex size-9 items-center justify-center text-charcoal/75 transition-colors hover:text-charcoal"
      aria-label="Menüyü kapat"
     >
      <X className="size-[1.35rem] shrink-0 stroke-[1.5]" />
     </button>
    </SheetClose>
   </div>

   <nav
    className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5 pb-6"
    aria-label="Ana menü"
   >
    {mobileNavSections.map((section, sectionIndex) => (
     <Fragment key={sectionIndex}>
      {section.divider ? (
       <div className="mobile-nav-divider my-1.5" aria-hidden />
      ) : null}
      <ul className="flex flex-col">
       {section.items.map((item) => (
        <MobileDrawerNavItem
         key={item.href}
         item={item}
         pathname={pathname}
         onClose={onClose}
        />
       ))}
      </ul>
     </Fragment>
    ))}
   </nav>
  </SheetContent>
 );
}

function MobileDrawerNavItem({ item, pathname, onClose }) {
 const [submenuOpen, setSubmenuOpen] = useState(false);
 const active =
  pathname === item.href || pathname.startsWith(`${item.href}/`);
 const submenuItems = getMobileSubmenuItems(item);
 const hasSubmenu = submenuItems.length > 0;

 return (
  <li className="mobile-nav-item border-b border-charcoal/8 last:border-b-0">
   <div
    className={cn(
     "flex min-h-13 items-center",
     active ? "text-charcoal" : "text-charcoal/90"
    )}
   >
    <Link
     href={item.href}
     onClick={onClose}
     className="flex flex-1 items-center py-3.5 text-[0.9375rem] font-medium transition-colors hover:text-charcoal"
    >
     {item.label}
    </Link>
    {hasSubmenu ? (
     <button
      type="button"
      onClick={() => setSubmenuOpen((prev) => !prev)}
      className="flex size-11 shrink-0 items-center justify-end transition-colors hover:text-charcoal"
      aria-expanded={submenuOpen}
      aria-label={`${item.label} alt menüsünü ${submenuOpen ? "kapat" : "aç"}`}
     >
      <ChevronRight
       className={cn(
        "size-4 shrink-0 text-charcoal/35 transition-transform duration-200",
        submenuOpen && "rotate-90"
       )}
       aria-hidden
      />
     </button>
    ) : null}
   </div>

   {hasSubmenu && submenuOpen ? (
    <ul className="flex flex-col border-t border-charcoal/6 pb-2 pl-1">
     {submenuItems.map((subItem) => (
      <MobileDrawerSubItem
       key={subItem.href}
       subItem={subItem}
       pathname={pathname}
       onClose={onClose}
      />
     ))}
    </ul>
   ) : null}
  </li>
 );
}

function MobileDrawerSubItem({ subItem, pathname, onClose }) {
 const basePath = subItem.href.split("?")[0];
 const subActive =
  pathname === subItem.href ||
  pathname.startsWith(`${basePath}/`) ||
  (subItem.href.includes("?") && pathname === basePath);

 return (
  <li>
   <Link
    href={subItem.href}
    onClick={onClose}
    className={cn(
     "block py-3 pr-2 text-[0.875rem] transition-colors",
     subActive
      ? "font-medium text-charcoal"
      : "text-charcoal/65 hover:text-charcoal"
    )}
   >
    {subItem.label}
   </Link>
  </li>
 );
}
