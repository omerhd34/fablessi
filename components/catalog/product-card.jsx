import Image from "next/image";
import Link from "next/link";
import { getPrimaryImageUrl } from "@/lib/queries/home";
import { cn } from "@/lib/utils";

const PLACEHOLDER =
 "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80";

export function ProductCard({ product, className, priority = false }) {
 const imageUrl = getPrimaryImageUrl(product) ?? PLACEHOLDER;

 return (
  <article className={cn("group/card", className)}>
   <Link href={`/urunler/${product.slug}`} className="block">
    <div className="product-card-kalif relative aspect-4/5 overflow-hidden">
     <Image
      src={imageUrl}
      alt={product.images?.[0]?.alt ?? product.name}
      fill
      sizes="(max-width: 768px) 50vw, 25vw"
      className="object-contain p-6 transition-transform duration-500 group-hover/card:scale-[1.03]"
      priority={priority}
     />

     <div className="absolute right-3 bottom-3 left-3 flex items-end justify-between gap-2">
      <span className="inline-flex max-w-[70%] rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-charcoal shadow-sm">
       {product.name}
      </span>
      {product.collection?.name ? (
       <span className="hidden rounded-xl bg-white/80 px-2.5 py-1 text-[10px] font-medium text-charcoal/70 backdrop-blur-sm sm:inline-flex">
        {product.collection.name}
       </span>
      ) : null}
     </div>
    </div>
   </Link>
  </article>
 );
}
