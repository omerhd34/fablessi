import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function AdminLogo({ className, height = "h-8" }) {
 return (
  <Link
   href="/admin"
   className={cn("inline-flex cursor-pointer items-center", className)}
   aria-label="Yönetim paneli"
  >
   <Image
    src="/brand/logo.png"
    alt="Fablessi"
    width={1168}
    height={268}
    className={cn("w-auto brightness-0", height)}
    priority
   />
  </Link>
 );
}
