"use client";

import { usePathname } from "next/navigation";
import { AdminNav } from "@/components/admin/admin-nav";

export function AdminShell({ children }) {
 const pathname = usePathname();
 const isLogin = pathname === "/admin/login";

 return (
  <div
   className={
    isLogin
     ? "min-h-screen"
     : "min-h-screen bg-[linear-gradient(180deg,var(--cream)_0%,var(--sand)_100%)]"
   }
  >
   {!isLogin && <AdminNav />}
   <div className={isLogin ? "" : "mx-auto max-w-7xl px-4 py-8 sm:px-6"}>{children}</div>
  </div>
 );
}
