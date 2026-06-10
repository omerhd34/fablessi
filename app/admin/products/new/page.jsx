import { ProductForm } from "@/components/admin/product-form";
import {
 getCollectionOptions,
 getCategoryGroupOptions,
} from "@/lib/admin/queries";
import { getFeaturedProductCount } from "@/lib/admin/featured-products";

export default async function NewProductPage() {
 const [collections, categoryGroups, featuredCount] = await Promise.all([
  getCollectionOptions(),
  getCategoryGroupOptions(),
  getFeaturedProductCount(),
 ]);

 return (
  <div className="space-y-6">
   <div>
    <h1 className="text-2xl font-semibold tracking-tight">Yeni Ürün</h1>
   </div>
   <ProductForm
    collections={collections}
    categoryGroups={categoryGroups}
    featuredCount={featuredCount}
   />
  </div>
 );
}
