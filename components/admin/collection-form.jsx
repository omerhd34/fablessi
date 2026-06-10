"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdSave } from "react-icons/md";
import { toast } from "sonner";
import { DeleteButton } from "@/components/admin/delete-button";
import { AdminImageUpload } from "@/components/admin/admin-image-upload";
import { slugify } from "@/lib/admin/slug";
import {
 getCollectionCoverImageRequirements,
 getCollectionCoverImageSummary,
} from "@/lib/admin/image-specs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const emptyCollection = {
 name: "",
 nameEn: "",
 slug: "",
 coverImage: "",
 sortOrder: 0,
 isPublished: true,
};

export function CollectionForm({ collection = null }) {
 const router = useRouter();
 const [form, setForm] = useState(collection ?? emptyCollection);
 const [loading, setLoading] = useState(false);
 const [uploading, setUploading] = useState(false);
 const isEdit = Boolean(collection?.id);

 function getCoverUploadFolder(currentForm) {
  if (currentForm.coverImage) {
   const parts = currentForm.coverImage.split("/").filter(Boolean);
   if (parts.length >= 2) return parts[0];
  }

  return slugify(currentForm.name);
 }

 function updateField(field, value) {
  setForm((current) => {
   const next = { ...current, [field]: value };
   if (field === "name") {
    next.slug = slugify(value);
   }
   return next;
  });
 }

 async function uploadCoverImage(file) {
  const folder = getCoverUploadFolder(form);
  if (!folder) {
   toast.error("Önce koleksiyon adı girin");
   return;
  }

  setUploading(true);
  try {
   const body = new FormData();
   body.append("file", file);
   body.append("folder", folder);

   const response = await fetch("/api/admin/upload", {
    method: "POST",
    body,
   });
   const data = await response.json();
   if (!response.ok) throw new Error(data.error || "Yükleme başarısız");

   updateField("coverImage", data.url);
   toast.success("Kapak görseli yüklendi");
  } catch (error) {
   toast.error(error.message);
  } finally {
   setUploading(false);
  }
 }

 async function handleSubmit(event) {
  event.preventDefault();
  setLoading(true);

  try {
   const response = await fetch(
    isEdit ? `/api/admin/collections/${collection.id}` : "/api/admin/collections",
    {
     method: isEdit ? "PUT" : "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ ...form, slug: slugify(form.name) }),
    }
   );

   const data = await response.json();
   if (!response.ok) throw new Error(data.error || "Kaydedilemedi");

   toast.success(isEdit ? "Koleksiyon güncellendi" : "Koleksiyon oluşturuldu");
   router.push(`/admin/collections/${data.id}`);
   router.refresh();
  } catch (error) {
   toast.error(error.message);
  } finally {
   setLoading(false);
  }
 }

 return (
  <form onSubmit={handleSubmit} className="space-y-6">
   <Card>
    <CardHeader>
     <CardTitle>{isEdit ? "Koleksiyon Düzenle" : "Yeni Koleksiyon"}</CardTitle>
    </CardHeader>
    <CardContent className="grid gap-4 md:grid-cols-3">
     <div className="space-y-2">
      <Label htmlFor="name">Ad (TR)</Label>
      <Input
       id="name"
       value={form.name}
       onChange={(e) => updateField("name", e.target.value)}
       required
      />
     </div>
     <div className="space-y-2">
      <Label htmlFor="nameEn">Ad (EN)</Label>
      <Input
       id="nameEn"
       value={form.nameEn ?? ""}
       onChange={(e) => updateField("nameEn", e.target.value)}
      />
     </div>
     <div className="space-y-2">
      <Label htmlFor="sortOrder">Sıra</Label>
      <Input
       id="sortOrder"
       type="number"
       value={form.sortOrder ?? 0}
       onChange={(e) => updateField("sortOrder", Number(e.target.value))}
      />
     </div>
     <div className="md:col-span-3">
      <AdminImageUpload
       value={form.coverImage ?? ""}
       onChange={(value) => updateField("coverImage", value)}
       onUpload={uploadCoverImage}
       uploading={uploading}
       hint={getCollectionCoverImageSummary()}
       dropzoneHint={getCollectionCoverImageRequirements()}
      />
     </div>
     <label className="flex cursor-pointer items-center gap-2 md:col-span-3">
      <Checkbox
       checked={form.isPublished !== false}
       onCheckedChange={(checked) => updateField("isPublished", Boolean(checked))}
      />
      <span className="text-sm">Yayında</span>
     </label>
    </CardContent>
   </Card>

   <div className="flex items-center justify-between gap-3">
    {isEdit ? (
     <DeleteButton
      href={`/api/admin/collections/${collection.id}`}
      confirmTitle="Koleksiyonu sil?"
      confirmDescription="Koleksiyona bağlı tüm ürünler de silinir."
      redirectTo="/admin/collections"
     />
    ) : (
     <div />
    )}
    <Button type="submit" className="cursor-pointer gap-2" disabled={loading || uploading}>
     {loading ? (
      "Kaydediliyor…"
     ) : isEdit ? (
      <>
       <MdSave className="size-4" />
       Güncelle
      </>
     ) : (
      "Oluştur"
     )}
    </Button>
   </div>
  </form>
 );
}
