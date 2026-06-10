"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MdAdd, MdDeleteOutline, MdSave } from "react-icons/md";
import { AdminFormSelect } from "@/components/admin/admin-form-select";
import { DeleteButton } from "@/components/admin/delete-button";
import { VariantColorInput } from "@/components/admin/variant-color-input";
import { VariantImagesEditor } from "@/components/admin/variant-images-editor";
import { MAX_FEATURED_PRODUCTS } from "@/lib/admin/featured-products";
import { slugify } from "@/lib/admin/slug";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoIcon } from "@/lib/icons";

const emptyDimensionItem = {
 name: "",
 nameEn: "",
 widthCm: "",
 depthCm: "",
 heightCm: "",
 amount: "",
 quantity: "1",
};

function normalizeDimensionItemQuantity(quantity) {
 if (quantity == null || quantity === "" || Number(quantity) < 1) return "1";
 return String(quantity);
}

const emptyVariant = {
 name: "",
 nameEn: "",
 color: "",
 material: "",
 materialEn: "",
 isDefault: false,
 images: [],
};

const emptyImage = {
 url: "",
 alt: "",
 altEn: "",
 isPrimary: false,
};

function createEmptyProduct(collectionId = "", categoryGroupId = "") {
 return {
  name: "",
  nameEn: "",
  slug: "",
  description: "",
  descriptionEn: "",
  dimensions: "",
  widthCm: "",
  depthCm: "",
  heightCm: "",
  sortOrder: 0,
  isPublished: true,
  isFeatured: false,
  featuredOrder: 0,
  collectionId,
  categoryGroupId,
  dimensionItems: [{ ...emptyDimensionItem }],
  variants: [{ ...emptyVariant, isDefault: true }],
 };
}

export function ProductForm({
 product = null,
 collections = [],
 categoryGroups = [],
 featuredCount = 0,
 maxFeatured = MAX_FEATURED_PRODUCTS,
}) {
 const router = useRouter();
 const isEdit = Boolean(product?.id);
 const [form, setForm] = useState(() => {
  if (!product) {
   return createEmptyProduct(collections[0]?.id ?? "", categoryGroups[0]?.id ?? "");
  }

  return {
   ...product,
   widthCm: product.widthCm ?? "",
   depthCm: product.depthCm ?? "",
   heightCm: product.heightCm ?? "",
   dimensionItems:
    product.dimensionItems?.length > 0
     ? product.dimensionItems.map((item) => ({
      name: item.name ?? "",
      nameEn: item.nameEn ?? "",
      widthCm: item.widthCm ?? "",
      depthCm: item.depthCm ?? "",
      heightCm: item.heightCm ?? "",
      amount: item.amount ?? "",
      quantity: normalizeDimensionItemQuantity(item.quantity),
     }))
     : [{ ...emptyDimensionItem }],
   variants:
    product.variants?.length > 0
     ? product.variants.map((variant) => ({
      name: variant.name ?? "",
      nameEn: variant.nameEn ?? "",
      color: variant.color ?? "",
      material: variant.material ?? "",
      materialEn: variant.materialEn ?? "",
      isDefault: Boolean(variant.isDefault),
      images:
       variant.images?.map((image) => ({
        url: image.url ?? "",
        alt: image.alt ?? "",
        altEn: image.altEn ?? "",
        isPrimary: Boolean(image.isPrimary),
       })) ?? [],
     }))
     : [{ ...emptyVariant, isDefault: true }],
   categoryGroupId: product.categoryGroupId ?? product.categoryGroup?.id ?? "",
  };
 });
 const [loading, setLoading] = useState(false);
 const [uploadingVariantIndex, setUploadingVariantIndex] = useState(null);
 const [uploadStatusByVariant, setUploadStatusByVariant] = useState({});
 const [uploadTargetIndex, setUploadTargetIndex] = useState(null);
 const fileInputRef = useRef(null);
 const canMarkFeatured = Boolean(form.isFeatured) || featuredCount < maxFeatured;

 const totalPrice = useMemo(() => {
  return form.dimensionItems.reduce((sum, item) => {
   const amount = Number(item.amount);
   const quantity = Number(item.quantity) > 0 ? Number(item.quantity) : 1;
   if (!amount) return sum;
   return sum + amount * quantity;
  }, 0);
 }, [form.dimensionItems]);

 function updateField(field, value) {
  setForm((current) => {
   const next = { ...current, [field]: value };
   if (field === "name") {
    next.slug = slugify(value);
   }
   return next;
  });
 }

 function updateListItem(listName, index, field, value) {
  setForm((current) => ({
   ...current,
   [listName]: current[listName].map((item, itemIndex) =>
    itemIndex === index ? { ...item, [field]: value } : item
   ),
  }));
 }

 function addListItem(listName, template) {
  setForm((current) => ({
   ...current,
   [listName]: [...current[listName], { ...template }],
  }));
 }

 function removeListItem(listName, index) {
  setForm((current) => ({
   ...current,
   [listName]: current[listName].filter((_, itemIndex) => itemIndex !== index),
  }));
 }

 function moveListItem(listName, index, direction) {
  setForm((current) => {
   const items = [...current[listName]];
   const target = index + direction;
   if (target < 0 || target >= items.length) return current;
   [items[index], items[target]] = [items[target], items[index]];
   return { ...current, [listName]: items };
  });
 }

 function updateVariantImages(variantIndex, updater) {
  setForm((current) => ({
   ...current,
   variants: current.variants.map((variant, index) =>
    index === variantIndex
     ? { ...variant, images: updater(variant.images ?? []) }
     : variant
   ),
  }));
 }

 function moveVariantImage(variantIndex, imageIndex, direction) {
  updateVariantImages(variantIndex, (images) => {
   const items = [...images];
   const target = imageIndex + direction;
   if (target < 0 || target >= items.length) return items;
   [items[imageIndex], items[target]] = [items[target], items[imageIndex]];
   return items;
  });
 }

 function setPrimaryVariantImage(variantIndex, imageIndex) {
  updateVariantImages(variantIndex, (images) =>
   images.map((image, index) => ({
    ...image,
    isPrimary: index === imageIndex,
   }))
  );
 }

 function getVariantUploadFolder(variant, variantIndex) {
  const base = slugify(form.name) || product?.slug;
  const suffix = slugify(variant.name) || `v${variantIndex + 1}`;
  return `${base}/${suffix}`;
 }

 async function handleUpload(event) {
  const file = event.target.files?.[0];
  const variantIndex = uploadTargetIndex;
  if (!file || variantIndex == null) return;

  const folder = getVariantUploadFolder(form.variants[variantIndex], variantIndex);
  if (!folder || !slugify(form.name)) {
   toast.error("Önce ürün adı girin");
   return;
  }

  setUploadStatusByVariant((current) => ({
   ...current,
   [variantIndex]: `${file.name} yükleniyor…`,
  }));
  setUploadingVariantIndex(variantIndex);
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

   updateVariantImages(variantIndex, (images) => [
    ...images,
    {
     ...emptyImage,
     url: data.url,
     isPrimary: images.length === 0,
    },
   ]);
   setUploadStatusByVariant((current) => ({
    ...current,
    [variantIndex]: `${file.name} eklendi`,
   }));
   toast.success("Görsel yüklendi");
  } catch (error) {
   setUploadStatusByVariant((current) => ({
    ...current,
    [variantIndex]: "",
   }));
   toast.error(error.message);
  } finally {
   setUploadingVariantIndex(null);
   event.target.value = "";
  }
 }

 function openVariantUpload(variantIndex) {
  setUploadTargetIndex(variantIndex);
  fileInputRef.current?.click();
 }

 async function handleSubmit(event) {
  event.preventDefault();
  setLoading(true);

  try {
   const payload = {
    ...form,
    slug: slugify(form.name),
    variants: form.variants.map((variant) => ({
     ...variant,
     images: (variant.images ?? []).map((image, index) => ({
      ...image,
      isPrimary:
       image.isPrimary ||
       (index === 0 && !(variant.images ?? []).some((item) => item.isPrimary)),
     })),
    })),
   };

   const response = await fetch(
    isEdit ? `/api/admin/products/${product.id}` : "/api/admin/products",
    {
     method: isEdit ? "PUT" : "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(payload),
    }
   );

   const data = await response.json();
   if (!response.ok) throw new Error(data.error || "Kaydedilemedi");

   toast.success(isEdit ? "Ürün güncellendi" : "Ürün oluşturuldu");
   router.push(`/admin/products/${data.id}`);
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
     <CardTitle>Genel Bilgiler</CardTitle>
    </CardHeader>
    <CardContent className="grid gap-4 md:grid-cols-2">
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
      <Label htmlFor="categoryGroupId">Kategori</Label>
      <AdminFormSelect
       id="categoryGroupId"
       value={form.categoryGroupId ?? ""}
       onValueChange={(nextValue) => updateField("categoryGroupId", nextValue)}
       placeholder="Kategori seçin"
       allowEmpty
       options={categoryGroups.map((group) => ({
        value: group.id,
        label: group.name,
       }))}
      />
     </div>
     <div className="space-y-2">
      <Label htmlFor="collectionId">Koleksiyon</Label>
      <AdminFormSelect
       id="collectionId"
       value={form.collectionId}
       onValueChange={(nextValue) => updateField("collectionId", nextValue)}
       placeholder="Koleksiyon seçin"
       options={collections.map((collection) => ({
        value: collection.id,
        label: collection.name,
       }))}
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
     <div className="space-y-2">
      <Label htmlFor="featuredOrder">Vitrin sırası</Label>
      <Input
       id="featuredOrder"
       type="number"
       value={form.featuredOrder ?? 0}
       onChange={(e) => updateField("featuredOrder", Number(e.target.value))}
      />
     </div>
     <div className="grid gap-4 md:col-span-2 md:grid-cols-2">
      <div className="flex flex-col gap-2">
       <Label htmlFor="description">Açıklama (TR)</Label>
       <Textarea
        id="description"
        value={form.description ?? ""}
        onChange={(e) => updateField("description", e.target.value)}
        rows={6}
        className="h-36 field-sizing-fixed resize-none"
       />
      </div>
      <div className="flex flex-col gap-2">
       <Label htmlFor="descriptionEn">Açıklama (EN)</Label>
       <Textarea
        id="descriptionEn"
        value={form.descriptionEn ?? ""}
        onChange={(e) => updateField("descriptionEn", e.target.value)}
        rows={6}
        className="h-36 field-sizing-fixed resize-none"
       />
      </div>
     </div>
     <label className="flex cursor-pointer items-center gap-2">
      <Checkbox
       checked={form.isPublished !== false}
       onCheckedChange={(checked) => updateField("isPublished", Boolean(checked))}
      />
      <span className="text-sm">Yayında</span>
     </label>
     <div className="flex items-center gap-2">
      <label
       className={`flex items-center gap-2 ${canMarkFeatured ? "cursor-pointer" : "cursor-default"}`}
      >
       <Checkbox
        checked={Boolean(form.isFeatured)}
        disabled={!canMarkFeatured}
        className="disabled:cursor-default"
        onCheckedChange={(checked) => {
         if (checked && !canMarkFeatured) {
          toast.error(`Anasayfa vitrininde en fazla ${maxFeatured} ürün olabilir.`);
          return;
         }
         updateField("isFeatured", Boolean(checked));
        }}
       />
       <span
        className={`text-sm ${!canMarkFeatured ? "text-muted-foreground" : ""}`}
       >
        Anasayfa vitrininde göster
       </span>
      </label>
      {!canMarkFeatured ? (
       <Tooltip>
        <TooltipTrigger asChild>
         <button
          type="button"
          className="inline-flex cursor-pointer items-center rounded-md p-0.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          aria-label="Vitrin limiti hakkında bilgi"
         >
          <InfoIcon className="size-4" />
         </button>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={6}>
         Vitrin dolu ({featuredCount}/{maxFeatured}). Yeni vitrin eklemek için mevcut bir
         vitrin işaretini kaldırın.
        </TooltipContent>
       </Tooltip>
      ) : null}
     </div>
    </CardContent>
   </Card>

   <Card>
    <CardHeader>
     <CardTitle>Parça Ölçüleri ve Fiyatlar</CardTitle>
     <CardAction>
      <div
       className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-sm font-medium shadow-sm"
       aria-label="Toplam fiyat"
      >
       <span className="text-muted-foreground">Toplam:</span>
       <span className="tabular-nums text-foreground">
        {totalPrice > 0 ? `${totalPrice.toLocaleString("tr-TR")} TL` : "—"}
       </span>
      </div>
     </CardAction>
    </CardHeader>
    <CardContent className="space-y-4">
     <div className="grid gap-4 md:grid-cols-4">
      <div className="space-y-2 md:col-span-4">
       <Label htmlFor="dimensions">Ölçü özeti</Label>
       <Input
        id="dimensions"
        value={form.dimensions ?? ""}
        onChange={(e) => updateField("dimensions", e.target.value)}
        placeholder="240 x 90 x 75 cm"
       />
      </div>
     </div>

     {form.dimensionItems.map((item, index) => (
      <div
       key={`dim-${index}`}
       className="space-y-3 rounded-lg border p-4"
      >
       <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1">
         <Label>Parça (TR)</Label>
         <Input
          value={item.name}
          onChange={(e) =>
           updateListItem("dimensionItems", index, "name", e.target.value)
          }
         />
        </div>
        <div className="space-y-1">
         <Label>Parça (EN)</Label>
         <Input
          value={item.nameEn}
          onChange={(e) =>
           updateListItem("dimensionItems", index, "nameEn", e.target.value)
          }
         />
        </div>
       </div>
       <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1">
         <Label>Fiyat (TL)</Label>
         <Input
          type="number"
          step="0.01"
          value={item.amount}
          onChange={(e) =>
           updateListItem("dimensionItems", index, "amount", e.target.value)
          }
         />
        </div>
        <div className="space-y-1">
         <Label>Adet</Label>
         <Input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) =>
           updateListItem("dimensionItems", index, "quantity", e.target.value)
          }
          onBlur={(e) => {
           if (!e.target.value || Number(e.target.value) < 1) {
            updateListItem("dimensionItems", index, "quantity", "1");
           }
          }}
         />
        </div>
       </div>
       <div className="grid gap-3 md:grid-cols-3">
        <div className="space-y-1">
         <Label>Genişlik (cm)</Label>
         <Input
          type="number"
          value={item.widthCm}
          onChange={(e) =>
           updateListItem("dimensionItems", index, "widthCm", e.target.value)
          }
         />
        </div>
        <div className="space-y-1">
         <Label>Derinlik (cm)</Label>
         <Input
          type="number"
          value={item.depthCm}
          onChange={(e) =>
           updateListItem("dimensionItems", index, "depthCm", e.target.value)
          }
         />
        </div>
        <div className="space-y-1">
         <Label>Yükseklik (cm)</Label>
         <Input
          type="number"
          value={item.heightCm}
          onChange={(e) =>
           updateListItem("dimensionItems", index, "heightCm", e.target.value)
          }
         />
        </div>
       </div>
       <div className="flex justify-end border-t border-border/60 pt-3">
        <Button
         type="button"
         variant="outline"
         size="sm"
         className="cursor-pointer border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive disabled:border-border disabled:text-muted-foreground disabled:hover:bg-transparent"
         onClick={() => removeListItem("dimensionItems", index)}
         disabled={form.dimensionItems.length === 1}
        >
         <MdDeleteOutline aria-hidden />
         Parçayı kaldır
        </Button>
       </div>
      </div>
     ))}

     <Button
      type="button"
      variant="outline"
      size="sm"
      className="cursor-pointer"
      onClick={() => addListItem("dimensionItems", { ...emptyDimensionItem })}
     >
      <MdAdd aria-hidden />
      Parça ekle
     </Button>
    </CardContent>
   </Card>

   <Card>
    <CardHeader>
     <CardTitle>Varyantlar</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
     <input
      ref={fileInputRef}
      type="file"
      accept="image/jpeg,image/png,image/webp"
      onChange={handleUpload}
      disabled={uploadingVariantIndex != null}
      className="sr-only"
     />
     {form.variants.map((variant, index) => (
      <div key={`variant-${index}`} className="space-y-3 rounded-lg border p-4">
       <div className="grid gap-3 md:grid-cols-3">
        <div className="space-y-1">
         <Label>Ad (TR)</Label>
         <Input
          value={variant.name}
          onChange={(e) =>
           updateListItem("variants", index, "name", e.target.value)
          }
         />
        </div>
        <div className="space-y-1">
         <Label>Ad (EN)</Label>
         <Input
          value={variant.nameEn}
          onChange={(e) =>
           updateListItem("variants", index, "nameEn", e.target.value)
          }
         />
        </div>
        <div className="space-y-1">
         <Label>Renk</Label>
         <VariantColorInput
          value={variant.color ?? ""}
          onChange={(nextColor) =>
           updateListItem("variants", index, "color", nextColor)
          }
         />
        </div>
        <div className="space-y-1">
         <Label>Malzeme (TR)</Label>
         <Input
          value={variant.material}
          onChange={(e) =>
           updateListItem("variants", index, "material", e.target.value)
          }
         />
        </div>
        <div className="space-y-1">
         <Label>Malzeme (EN)</Label>
         <Input
          value={variant.materialEn}
          onChange={(e) =>
           updateListItem("variants", index, "materialEn", e.target.value)
          }
         />
        </div>
        <label className="flex cursor-pointer items-center gap-2 self-end pb-1">
         <Checkbox
          checked={Boolean(variant.isDefault)}
          onCheckedChange={(checked) => {
           setForm((current) => ({
            ...current,
            variants: current.variants.map((item, itemIndex) => ({
             ...item,
             isDefault: itemIndex === index ? Boolean(checked) : false,
            })),
           }));
          }}
         />
         <span className="text-sm">Varsayılan</span>
        </label>
       </div>
       <VariantImagesEditor
        images={variant.images ?? []}
        productName={form.name}
        uploading={uploadingVariantIndex === index}
        uploadStatus={uploadStatusByVariant[index] ?? ""}
        onSelectFile={() => openVariantUpload(index)}
        onSetPrimary={(imageIndex) => setPrimaryVariantImage(index, imageIndex)}
        onMove={(imageIndex, direction) =>
         moveVariantImage(index, imageIndex, direction)
        }
        onRemove={(imageIndex) =>
         updateVariantImages(index, (images) =>
          images.filter((_, itemIndex) => itemIndex !== imageIndex)
         )
        }
       />
       <div className="flex justify-end border-t border-border/60 pt-3">
        <Button
         type="button"
         variant="outline"
         size="sm"
         className="cursor-pointer border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive disabled:border-border disabled:text-muted-foreground disabled:hover:bg-transparent"
         onClick={() => removeListItem("variants", index)}
         disabled={form.variants.length === 1}
        >
         <MdDeleteOutline aria-hidden />
         Varyantı kaldır
        </Button>
       </div>
      </div>
     ))}
     <Button
      type="button"
      variant="outline"
      size="sm"
      className="cursor-pointer"
      onClick={() => addListItem("variants", { ...emptyVariant })}
     >
      <MdAdd aria-hidden />
      Varyant ekle
     </Button>
    </CardContent>
   </Card>

   <div className="flex items-center justify-between gap-3">
    {isEdit ? (
     <DeleteButton
      href={`/api/admin/products/${product.id}`}
      confirmTitle="Ürünü sil?"
      confirmDescription="Bu ürün kalıcı olarak silinir."
      redirectTo="/admin/products"
     />
    ) : (
     <div />
    )}
    <Button
     type="submit"
     className="cursor-pointer gap-2"
     disabled={loading || uploadingVariantIndex != null}
    >
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