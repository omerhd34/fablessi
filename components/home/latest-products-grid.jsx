import Link from "next/link";
import { ProductCard } from "@/components/catalog/product-card";

export function LatestProductsGrid({ products }) {
 if (!products.length) {
  return null;
 }

 return (
  <section className="section-padding bg-white">
   <div className="container-premium">
    <div className="mb-10 text-center md:mb-14">
     <h2 className="heading-display text-charcoal">Yeni Ürünler</h2>
     <p className="text-muted-foreground mx-auto mt-3 max-w-xl text-sm md:text-base">
      Online kataloğumuzdaki en yeni tasarımları keşfedin.
     </p>
    </div>

    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:grid-cols-4">
     {products.map((product, index) => (
      <ProductCard
       key={product.id}
       product={product}
       priority={index < 2}
      />
     ))}
    </div>

    <div className="mt-10 flex justify-center">
     <Link
      href="/urunler"
      className="inline-flex h-11 items-center justify-center rounded-full border border-charcoal/15 px-8 text-sm font-semibold text-charcoal transition hover:bg-charcoal hover:text-white"
     >
      Tüm ürünleri gör
     </Link>
    </div>
   </div>
  </section>
 );
}
