"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
 MdArticle,
 MdCategory,
 MdCollections,
 MdLogout,
 MdOpenInNew,
 MdViewModule,
} from "react-icons/md";
import { AdminLogo } from "@/components/admin/admin-logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
 { href: "/admin/collections", label: "Koleksiyonlar", icon: MdCollections },
 { href: "/admin/categories", label: "Kategoriler", icon: MdCategory },
 { href: "/admin/products", label: "Ürünler", icon: MdViewModule },
 { href: "/admin/content", label: "İçerik", icon: MdArticle },
];

export function AdminNav() {
 const pathname = usePathname();
 const router = useRouter();

 async function handleLogout() {
  await fetch("/api/admin/auth/logout", { method: "POST" });
  router.push("/admin/login");
  router.refresh();
 }

 return (
  <header className="sticky top-0 z-50 border-b border-border/70 bg-card/90 shadow-sm backdrop-blur-md">
   <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-4">
    <div className="flex items-center justify-between gap-3 lg:justify-start">
     <div className="flex items-center gap-3">
      <AdminLogo height="h-7 sm:h-8" />
      <span className="rounded-full border border-border/80 bg-muted/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
       Yönetim
      </span>
     </div>
     <div className="flex items-center gap-1.5 lg:hidden">
      <Button variant="outline" size="sm" className="cursor-pointer" asChild>
       <Link href="/" target="_blank">
        <MdOpenInNew />
       </Link>
      </Button>
      <Button
       variant="ghost"
       size="sm"
       className="cursor-pointer"
       onClick={handleLogout}
       aria-label="Çıkış"
      >
       <MdLogout />
      </Button>
     </div>
    </div>

    <nav className="flex items-center justify-center gap-1 rounded-xl border border-border/60 bg-background/80 p-1">
     {links.map((link) => {
      const active = pathname.startsWith(link.href);
      const Icon = link.icon;

      return (
       <Link
        key={link.href}
        href={link.href}
        className={cn(
         "inline-flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
         active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
       >
        <Icon className="size-4 shrink-0" />
        <span>{link.label}</span>
       </Link>
      );
     })}
    </nav>

    <div className="hidden items-center justify-end gap-2 lg:flex">
     <Button variant="outline" size="sm" className="cursor-pointer gap-2" asChild>
      <Link href="/" target="_blank">
       <MdOpenInNew className="size-4" />
       Siteyi Gör
      </Link>
     </Button>
     <Button
      variant="ghost"
      size="sm"
      className="cursor-pointer gap-2 text-muted-foreground hover:text-foreground"
      onClick={handleLogout}
     >
      <MdLogout className="size-4" />
      Çıkış
     </Button>
    </div>
   </div>
  </header>
 );
}
