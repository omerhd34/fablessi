"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdSave } from "react-icons/md";
import { toast } from "sonner";
import { DeleteButton } from "@/components/admin/delete-button";
import {
 ADMIN_CATEGORY_NAME_FIELDS_HINT,
 applyAdminCategoryNameLimits,
 clampAdminCategoryName,
 MAX_ADMIN_CATEGORY_NAME_LENGTH,
 validateAdminCategoryName,
 validateAdminCategoryNameEn,
} from "@/lib/admin/field-limits";
import { slugify } from "@/lib/admin/slug";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const emptyCategoryGroup = {
 name: "",
 nameEn: "",
 slug: "",
 sortOrder: 0,
 isPublished: true,
};

export function CategoryGroupForm({ categoryGroup = null }) {
 const router = useRouter();
 const [form, setForm] = useState(() =>
  categoryGroup ? applyAdminCategoryNameLimits(categoryGroup) : emptyCategoryGroup
 );
 const [loading, setLoading] = useState(false);
 const isEdit = Boolean(categoryGroup?.id);

 function updateField(field, value) {
  setForm((current) => {
   const nextValue =
    field === "name" || field === "nameEn" ? clampAdminCategoryName(value) : value;
   const next = { ...current, [field]: nextValue };
   if (field === "name") {
    next.slug = slugify(nextValue);
   }
   return next;
  });
 }

 async function handleSubmit(event) {
  event.preventDefault();

  const nameError = validateAdminCategoryName(form.name, "Ad (TR)");
  if (nameError) {
   toast.error(nameError);
   return;
  }

  const nameEnError = validateAdminCategoryNameEn(form.nameEn);
  if (nameEnError) {
   toast.error(nameEnError);
   return;
  }

  setLoading(true);

  try {
   const response = await fetch(
    isEdit
     ? `/api/admin/category-groups/${categoryGroup.id}`
     : "/api/admin/category-groups",
    {
     method: isEdit ? "PUT" : "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
      name: form.name,
      nameEn: form.nameEn,
      slug: slugify(form.name),
      sortOrder: form.sortOrder,
      isPublished: form.isPublished,
     }),
    }
   );

   const data = await response.json();
   if (!response.ok) throw new Error(data.error || "Kaydedilemedi");

   toast.success(isEdit ? "Kategori grubu güncellendi" : "Kategori grubu oluşturuldu.");
   router.push(isEdit ? `/admin/categories/${data.id}` : "/admin/categories");
   router.refresh();
  } catch (error) {
   toast.error(error.message);
  } finally {
   setLoading(false);
  }
 }

 return (
  <form onSubmit={handleSubmit} noValidate className="space-y-6">
   <Card>
    <CardHeader>
     <CardTitle>{isEdit ? "Kategori Grubu Düzenle" : "Yeni Kategori Grubu"}</CardTitle>
    </CardHeader>
    <CardContent className="grid gap-4 md:grid-cols-10">
     <div className="space-y-2 md:col-span-4">
      <Label htmlFor="name">Ad (TR)</Label>
      <Input
       id="name"
       value={form.name}
       onChange={(e) => updateField("name", e.target.value)}
       maxLength={MAX_ADMIN_CATEGORY_NAME_LENGTH}
      />
     </div>
     <div className="space-y-2 md:col-span-4">
      <Label htmlFor="nameEn">Ad (EN)</Label>
      <Input
       id="nameEn"
       value={form.nameEn ?? ""}
       onChange={(e) => updateField("nameEn", e.target.value)}
       maxLength={MAX_ADMIN_CATEGORY_NAME_LENGTH}
      />
     </div>
     <div className="space-y-2 md:col-span-2">
      <Label htmlFor="sortOrder">Sıra</Label>
      <Input
       id="sortOrder"
       type="number"
       value={form.sortOrder ?? 0}
       onChange={(e) => updateField("sortOrder", Number(e.target.value))}
      />
     </div>
     <p className="text-xs text-muted-foreground md:col-span-8">{ADMIN_CATEGORY_NAME_FIELDS_HINT}</p>
     <label className="flex cursor-pointer items-center gap-2 md:col-span-10">
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
      href={`/api/admin/category-groups/${categoryGroup.id}`}
      confirmTitle="Kategori grubunu sil?"
      confirmDescription="Bu gruba bağlı ürünlerin kategori bilgisi kaldırılır."
      redirectTo="/admin/categories"
     />
    ) : (
     <div />
    )}
    <Button type="submit" className="cursor-pointer gap-2" disabled={loading}>
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
