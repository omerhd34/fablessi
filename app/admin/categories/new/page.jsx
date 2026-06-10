import { CategoryGroupForm } from "@/components/admin/category-group-form";

export default function NewCategoryGroupPage() {
 return (
  <div className="space-y-6">
   <div>
    <h1 className="text-2xl font-semibold tracking-tight">Yeni Kategori Grubu</h1>
   </div>
   <CategoryGroupForm />
  </div>
 );
}
