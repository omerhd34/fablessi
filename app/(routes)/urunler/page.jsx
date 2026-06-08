import { ProductsCatalogShell } from "@/components/catalog/products-catalog-shell";
import { productsMegaMenu } from "@/lib/navigation";
import { getPublishedProducts } from "@/lib/queries/products";

export const revalidate = 60;

export default async function UrunlerPage({ searchParams }) {
 const params = await searchParams;
 const categorySlug = params?.kategori ?? null;
 const activeGroup =
  productsMegaMenu.groups.find((group) => group.slug === categorySlug) ?? null;
 const products = await getPublishedProducts(categorySlug);

 return (
  <div className="container-premium page-content-offset pb-20 md:pb-28">
   <ProductsCatalogShell
    products={products}
    activeGroup={activeGroup}
    categorySlug={categorySlug}
   />
  </div>
 );
}
