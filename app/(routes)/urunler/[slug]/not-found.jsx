import Link from "next/link";

export default function UrunNotFound() {
 return (
  <div className="page-content-offset container-premium pb-20 text-center">
   <h1 className="heading-display text-charcoal">Ürün bulunamadı</h1>
   <p className="text-muted-foreground mt-3 text-sm">
    Aradığınız ürün kaldırılmış veya yayında olmayabilir.
   </p>
   <Link
    href="/urunler"
    className="mt-8 inline-flex rounded-full border border-charcoal/12 bg-white px-5 py-2.5 text-sm font-medium text-charcoal transition hover:border-charcoal/25"
   >
    Tüm ürünlere dön
   </Link>
  </div>
 );
}
