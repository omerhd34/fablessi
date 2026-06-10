import { notFound } from "next/navigation";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { CollectionForm } from "@/components/admin/collection-form";
import { getAdminCollection } from "@/lib/admin/queries";
import { Button } from "@/components/ui/button";

export default async function EditCollectionPage({ params }) {
 const { id } = await params;
 const collection = await getAdminCollection(id);

 if (!collection) notFound();

 return (
  <div className="space-y-6">
   <div className="flex flex-wrap items-center justify-between gap-3">
    <div>
     <h1 className="text-2xl font-semibold tracking-tight">{collection.name}</h1>
    </div>
    <Button variant="outline" className="gap-2" asChild>
     <Link href="/admin/collections">
      <MdArrowBack className="size-4" />
      Listeye dön
     </Link>
    </Button>
   </div>
   <CollectionForm collection={collection} />
  </div>
 );
}
