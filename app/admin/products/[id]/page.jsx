import { notFound } from "next/navigation";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { ProductForm } from "@/components/admin/product-form";
import {
 getAdminProduct,
 getCollectionOptions,
 getCategoryGroupOptions,
} from "@/lib/admin/queries";
import { getFeaturedProductCount } from "@/lib/admin/featured-products";
import { Button } from "@/components/ui/button";

export default async function EditProductPage({ params }) {
 const { id } = await params;
 const [product, collections, categoryGroups, featuredCount] = await Promise.all([
  getAdminProduct(id),
  getCollectionOptions(),
  getCategoryGroupOptions(),
  getFeaturedProductCount(),
 ]);

 if (!product) notFound();

 return (
  <div className="space-y-6">
   <div className="flex flex-wrap items-center justify-between gap-3">
    <div>
     <h1 className="text-2xl font-semibold tracking-tight">{product.name}</h1>
    </div>
    <div className="flex gap-2">
     <Button variant="outline" asChild>
      <Link href={`/urunler/${product.slug}`} target="_blank">
       Sitede gör
      </Link>
     </Button>
     <Button variant="outline" className="gap-2" asChild>
      <Link href="/admin/products">
       <MdArrowBack className="size-4" />
       Listeye dön
      </Link>
     </Button>
    </div>
   </div>
   <ProductForm
    product={product}
    collections={collections}
    categoryGroups={categoryGroups}
    featuredCount={featuredCount}
   />
  </div>
 );
}
