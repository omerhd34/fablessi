import Link from "next/link";
import { MdAdd } from "react-icons/md";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { CategoryGroupsTable } from "@/components/admin/category-groups-table";
import { getAdminCategoryGroups } from "@/lib/admin/queries";
import { Button } from "@/components/ui/button";

export default async function AdminCategoriesPage() {
 const groups = await getAdminCategoryGroups();

 return (
  <div className="space-y-6">
   <AdminPageHeader
    title="Kategori Grupları"
    description="Oturma grupları, köşe grupları ve benzeri ürün kategorilerini yönetin."
   >
    <Button className="cursor-pointer gap-2" asChild>
     <Link href="/admin/categories/new">
      <MdAdd className="size-4" />
      Yeni kategori
     </Link>
    </Button>
   </AdminPageHeader>

   <div className="overflow-hidden rounded-xl border border-border/70 bg-card/90 shadow-sm">
    <CategoryGroupsTable groups={groups} />
   </div>
  </div>
 );
}
