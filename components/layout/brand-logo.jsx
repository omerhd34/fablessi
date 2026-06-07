import Link from "next/link";
import { brandSlug } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const sizeClasses = {
 sm: "px-6 py-2.5 text-[1.2rem]",
 md: "px-8 py-3 text-[1.35rem] xl:text-[1.5rem]",
};

export function BrandLogoLink({ href = "/", size = "md", className }) {
 return (
  <Link
   href={href}
   className={cn("group inline-flex shrink-0 justify-self-center", className)}
   aria-label="Fablessi — ana sayfa"
  >
   <span
    className={cn(
     "brand-logo-pill brand-logo transition-opacity duration-200 group-hover:opacity-90",
     sizeClasses[size]
    )}
   >
    <span className="font-heading text-charcoal text-[length:inherit] font-bold lowercase leading-none tracking-[-0.02em]">
     {brandSlug}
    </span>
   </span>
  </Link>
 );
}
