import Image from "next/image";
import Link from "next/link";
import { getPrimaryImageUrl } from "@/lib/queries/home";

const FALLBACK_COVER =
 "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80";

export function CollectionsShowcase({ collections }) {
 if (!collections.length) {
  return null;
 }

 return (
  <section className="section-padding bg-cream/40">
   <div className="container-premium">
    <div className="mb-10 flex flex-col gap-3 md:mb-14 md:flex-row md:items-end md:justify-between">
     <div>
      <h2 className="heading-display text-charcoal">Kategoriler</h2>
      <p className="text-muted-foreground mt-3 max-w-lg text-sm md:text-base">
       Koleksiyon hikayelerini ve ürün gruplarını keşfedin.
      </p>
     </div>
     <Link
      href="/koleksiyonlar"
      className="text-sm font-semibold text-charcoal/70 transition hover:text-charcoal"
     >
      Tüm koleksiyonlar →
     </Link>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
     {collections.map((collection) => {
      const cover =
       collection.coverImage ??
       getPrimaryImageUrl(collection.products[0] ?? {}) ??
       FALLBACK_COVER;

      return (
       <Link
        key={collection.id}
        href={`/koleksiyonlar/${collection.slug}`}
        className="group block"
       >
        <div className="product-card-kalif relative aspect-4/5 overflow-hidden">
         <Image
          src={cover}
          alt={collection.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
         />
         <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/5 to-transparent" />
         <div className="absolute right-4 bottom-4 left-4">
          <span className="inline-flex rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-charcoal shadow-sm">
           {collection.name}
          </span>
          <p className="mt-2 text-xs font-medium text-white/80">
           {collection._count.products} ürün · hikayeyi gör
          </p>
         </div>
        </div>
       </Link>
      );
     })}
    </div>
   </div>
  </section>
 );
}
