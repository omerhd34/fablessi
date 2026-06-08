import Image from "next/image";
import Link from "next/link";
import { getPrimaryImageUrl } from "@/lib/queries/home";
import { getProductCardLabel } from "@/lib/product-utils";
import { cn } from "@/lib/utils";

const PLACEHOLDER =
 "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80";

export function ProductCard({
 product,
 className,
 priority = false,
 variant = "default",
}) {
 const imageUrl = getPrimaryImageUrl(product) ?? PLACEHOLDER;
 const isCatalog = variant === "catalog";

 return (
  <article className={cn("group/card", className)}>
   <Link href={`/urunler/${product.slug}`} className="block cursor-pointer">
    <div
     className={cn(
      "product-card-kalif relative overflow-hidden",
      isCatalog ? "aspect-5/4 rounded-3xl" : "aspect-4/5"
     )}
    >
     <Image
      src={imageUrl}
      alt={product.images?.[0]?.alt ?? product.name}
      fill
      sizes={
       isCatalog
        ? "(max-width: 640px) 100vw, 50vw"
        : "(max-width: 768px) 50vw, 25vw"
      }
      className={cn(
       "transition-transform duration-500 group-hover/card:scale-[1.03]",
       isCatalog ? "object-cover" : "object-contain p-6"
      )}
      priority={priority}
     />

     <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" />

     <div className="absolute right-3 bottom-3 left-3 flex items-end justify-between gap-2">
      <span
       className={cn(
        "inline-flex max-w-[80%] rounded-full bg-white font-semibold text-charcoal shadow-sm",
        isCatalog ? "px-4 py-2 text-sm" : "px-3.5 py-1.5 text-xs"
       )}
      >
       {getProductCardLabel(product)}
      </span>
      {product.collection?.name ? (
       <span className="hidden rounded-xl bg-white/85 px-2.5 py-1 text-[10px] font-medium text-charcoal/70 backdrop-blur-sm sm:inline-flex">
        {product.collection.name}
       </span>
      ) : null}
     </div>
    </div>
   </Link>
  </article>
 );
}
