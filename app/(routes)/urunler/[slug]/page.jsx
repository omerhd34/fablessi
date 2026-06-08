import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/product/product-detail-view";
import { getProductCategoryGroup } from "@/lib/navigation";
import {
 getCategoryRelatedProducts,
 getProductBySlug,
} from "@/lib/queries/products";

export const revalidate = 60;

export async function generateMetadata({ params }) {
 const { slug } = await params;
 const product = await getProductBySlug(slug);

 if (!product) {
  return { title: "Ürün Bulunamadı" };
 }

 return {
  title: product.name,
  description: product.description ?? `${product.name} — Fablessi ürün detayı`,
 };
}

export default async function UrunDetayPage({ params }) {
 const { slug } = await params;
 const product = await getProductBySlug(slug);

 if (!product) {
  notFound();
 }

 const categoryGroup = getProductCategoryGroup(slug);
 const categoryProducts = await getCategoryRelatedProducts(slug);

 return (
  <div className="page-content-offset pb-10 md:pb-14">
   <div className="container-premium">
    <ProductDetailView
     product={product}
     categoryLabel={categoryGroup?.label ?? null}
     categoryProducts={categoryProducts}
    />
   </div>
  </div>
 );
}
