import Link from "next/link";
import { MdAdd } from "react-icons/md";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ProductsTable } from "@/components/admin/products-table";
import { getAdminProducts } from "@/lib/admin/queries";
import { Button } from "@/components/ui/button";

export default async function AdminProductsPage() {
 const products = await getAdminProducts();

 return (
  <div className="space-y-6">
   <AdminPageHeader
    title="Ürünler"
    description="Fiyat, ölçü, varyant ve görselleri yönetin."
   >
    <Button className="cursor-pointer gap-2" asChild>
     <Link href="/admin/products/new">
      <MdAdd className="size-4" />
      Yeni ürün
     </Link>
    </Button>
   </AdminPageHeader>

   <div className="overflow-hidden rounded-xl border border-border/70 bg-card/90 shadow-sm">
    <ProductsTable products={products} />
   </div>
  </div>
 );
}
