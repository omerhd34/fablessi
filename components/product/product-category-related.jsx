import Image from "next/image";
import Link from "next/link";
import { getPrimaryImageUrl } from "@/lib/queries/home";
import { getProductCardLabel } from "@/lib/product-utils";

const PLACEHOLDER =
 "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80";

export function ProductCategoryRelated({ products, categoryLabel }) {
 if (products.length === 0) return null;

 return (
  <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl border border-charcoal/10 bg-white shadow-[0_8px_30px_rgb(0_0_0/5%)]">
   <div className="shrink-0 border-b border-charcoal/8 px-4 py-3.5">
    <h2 className="text-sm font-semibold text-charcoal">{categoryLabel}</h2>
   </div>
   <div className="min-h-0 flex-1 overflow-y-auto p-3 product-similar-scroll">
    <div className="space-y-3">
     {products.map((product) => {
      const imageUrl = getPrimaryImageUrl(product) ?? PLACEHOLDER;
      const defaultVariant =
       product.variants?.find((variant) => variant.isDefault) ??
       product.variants?.[0];

      return (
       <Link
        key={product.id}
        href={`/urunler/${product.slug}`}
        className="group flex cursor-pointer gap-3 rounded-2xl border border-charcoal/8 bg-white p-2.5 transition hover:border-charcoal/15 hover:shadow-[0_4px_16px_rgb(0_0_0/6%)]"
       >
        <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-cream/60">
         <Image
          src={imageUrl}
          alt={product.images?.[0]?.alt ?? product.name}
          fill
          sizes="64px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
         />
        </div>
        <div className="min-w-0 flex-1 py-0.5">
         <p className="truncate text-sm font-semibold text-charcoal">
          {getProductCardLabel(product)}
         </p>
         {product.collection?.name ? (
          <p className="text-muted-foreground mt-0.5 text-xs">
           {product.collection.name}
          </p>
         ) : null}
         {defaultVariant?.material ? (
          <p className="text-muted-foreground mt-1 truncate text-xs">
           {defaultVariant.material}
          </p>
         ) : null}
        </div>
       </Link>
      );
     })}
    </div>
   </div>
  </div>
 );
}
