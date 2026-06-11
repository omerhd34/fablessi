"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function VariantImagesEditor({
 images = [],
 productName = "",
 uploading = false,
 uploadStatus = "",
 onSelectFile,
 onSetPrimary,
 onMove,
 onRemove,
}) {
 return (
  <div className="space-y-3 rounded-lg border border-dashed border-border/70 bg-muted/10 p-3">
   <div className="space-y-2">
    <Label>Görseller</Label>
    <div className="flex min-h-8 items-center gap-3 rounded-lg border border-dashed border-border/70 bg-background/80 px-3 py-2">
     <Button
      type="button"
      variant="outline"
      size="sm"
      className="cursor-pointer shrink-0"
      disabled={uploading}
      onClick={onSelectFile}
     >
      {uploading ? "Yükleniyor…" : "Dosya seç"}
     </Button>
     <p className="min-w-0 truncate text-sm text-muted-foreground">
      {uploadStatus ||
       (images.length > 0
        ? `${images.length} görsel eklendi.`
        : "JPG, PNG veya WebP seçin.")}
     </p>
    </div>
   </div>

   {images.length === 0 ? (
    <p className="text-sm text-muted-foreground">Henüz görsel eklenmedi.</p>
   ) : (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
     {images.map((image, imageIndex) => (
      <div key={`${image.url}-${imageIndex}`} className="space-y-2 rounded-lg border bg-background p-2.5">
       <div className="relative aspect-4/3 overflow-hidden rounded-md bg-muted">
        <Image
         src={image.url}
         alt={image.alt || productName}
         fill
         className="object-cover"
         sizes="200px"
        />
       </div>
       <div className="flex flex-wrap gap-2">
        <Button
         type="button"
         size="sm"
         className="cursor-pointer"
         variant={image.isPrimary ? "default" : "outline"}
         onClick={() => onSetPrimary(imageIndex)}
        >
         {image.isPrimary ? "Kapak" : "Kapak yap"}
        </Button>
        <Button
         type="button"
         size="sm"
         variant="outline"
         className="cursor-pointer"
         onClick={() => onMove(imageIndex, -1)}
         disabled={imageIndex === 0}
        >
         ↑
        </Button>
        <Button
         type="button"
         size="sm"
         variant="outline"
         className="cursor-pointer"
         onClick={() => onMove(imageIndex, 1)}
         disabled={imageIndex === images.length - 1}
        >
         ↓
        </Button>
        <Button
         type="button"
         size="sm"
         variant="ghost"
         className="cursor-pointer"
         onClick={() => onRemove(imageIndex)}
        >
         Kaldır
        </Button>
       </div>
      </div>
     ))}
    </div>
   )}
  </div>
 );
}
