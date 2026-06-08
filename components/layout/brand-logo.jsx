import Link from "next/link";
import { brandSlug } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const sizeClasses = {
 sm: "px-7 py-3 text-[1.35rem]",
 md: "px-10 py-3.5 text-[1.55rem] xl:text-[1.8rem]",
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
