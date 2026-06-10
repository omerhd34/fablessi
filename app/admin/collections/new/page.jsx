import { CollectionForm } from "@/components/admin/collection-form";

export default function NewCollectionPage() {
 return (
  <div className="space-y-6">
   <div>
    <h1 className="text-2xl font-semibold tracking-tight">Yeni Koleksiyon</h1>
   </div>
   <CollectionForm />
  </div>
 );
}
