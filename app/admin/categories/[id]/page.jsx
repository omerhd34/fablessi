import { notFound } from "next/navigation";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { CategoryGroupForm } from "@/components/admin/category-group-form";
import { getAdminCategoryGroup } from "@/lib/admin/queries";
import { Button } from "@/components/ui/button";

export default async function EditCategoryGroupPage({ params }) {
 const { id } = await params;
 const categoryGroup = await getAdminCategoryGroup(id);

 if (!categoryGroup) notFound();

 return (
  <div className="space-y-6">
   <div className="flex flex-wrap items-center justify-between gap-3">
    <div>
     <h1 className="text-2xl font-semibold tracking-tight">{categoryGroup.name}</h1>
    </div>
    <Button variant="outline" className="gap-2" asChild>
     <Link href="/admin/categories">
      <MdArrowBack className="size-4" />
      Listeye dön
     </Link>
    </Button>
   </div>
   <CategoryGroupForm categoryGroup={categoryGroup} />
  </div>
 );
}
