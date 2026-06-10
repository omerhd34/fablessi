import Link from "next/link";
import { MdAdd } from "react-icons/md";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { CollectionsTable } from "@/components/admin/collections-table";
import { getAdminCollections } from "@/lib/admin/queries";
import { Button } from "@/components/ui/button";

export default async function AdminCollectionsPage() {
 const collections = await getAdminCollections();

 return (
  <div className="space-y-6">
   <AdminPageHeader title="Koleksiyonlar" description="Ürün gruplarını yönetin.">
    <Button className="cursor-pointer gap-2" asChild>
     <Link href="/admin/collections/new">
      <MdAdd className="size-4" />
      Yeni koleksiyon
     </Link>
    </Button>
   </AdminPageHeader>

   <div className="overflow-hidden rounded-xl border border-border/70 bg-card/90 shadow-sm">
    <CollectionsTable collections={collections} />
   </div>
  </div>
 );
}
