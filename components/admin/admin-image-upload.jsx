"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { MdCloudUpload, MdDeleteOutline, MdImage } from "react-icons/md";
import { Loader2Icon } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const ACCEPT = "image/jpeg,image/png,image/webp";

export function AdminImageUpload({
 label = "Kapak görseli",
 value = "",
 onChange,
 onUpload,
 uploading = false,
 disabled = false,
 hint = "JPG, PNG veya WebP · Maks. 10 MB",
 dropzoneHint,
 previewAspectClass = "aspect-16/10",
 className,
}) {
 const inputId = useId();
 const inputRef = useRef(null);
 const [dragOver, setDragOver] = useState(false);
 const isDisabled = disabled || uploading;

 async function processFile(file) {
  if (!file || isDisabled) return;
  await onUpload(file);
 }

 function openFilePicker() {
  if (isDisabled) return;
  inputRef.current?.click();
 }

 function handleFileChange(event) {
  void processFile(event.target.files?.[0]);
  event.target.value = "";
 }

 function handleDrop(event) {
  event.preventDefault();
  setDragOver(false);
  void processFile(event.dataTransfer.files?.[0]);
 }

 return (
  <div className={cn("space-y-3", className)}>
   <div className="space-y-1">
    <Label htmlFor={inputId}>{label}</Label>
    {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
   </div>

   <input
    ref={inputRef}
    id={inputId}
    type="file"
    accept={ACCEPT}
    className="sr-only"
    onChange={handleFileChange}
    disabled={isDisabled}
   />

   {value ? (
    <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm">
     <div className={cn("relative w-full max-h-80 overflow-hidden bg-muted", previewAspectClass)}>
      <Image
       src={value}
       alt={label}
       fill
       className="object-cover object-center"
       sizes="(max-width: 768px) 100vw, 640px"
      />
      {!uploading ? (
       <Button
        type="button"
        variant="secondary"
        size="icon"
        className="absolute top-3 right-3 z-10 size-10 cursor-pointer border-border/70 bg-background/95 text-destructive shadow-md backdrop-blur-sm hover:bg-background hover:text-destructive"
        disabled={isDisabled}
        aria-label="Görseli kaldır"
        onClick={() => onChange("")}
       >
        <MdDeleteOutline className="size-5" />
       </Button>
      ) : null}
      {uploading ? (
       <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm">
        <Loader2Icon className="size-8 animate-spin text-muted-foreground" />
       </div>
      ) : null}
     </div>

     <div className="flex flex-col items-center gap-3 border-t border-border/70 px-4 py-3 sm:flex-row sm:justify-center">
      <Button
       type="button"
       variant="outline"
       size="sm"
       className="cursor-pointer"
       disabled={isDisabled}
       onClick={openFilePicker}
      >
       <MdCloudUpload className="size-4" />
       Değiştir
      </Button>
     </div>
    </div>
   ) : (
    <button
     type="button"
     disabled={isDisabled}
     onClick={openFilePicker}
     onDragEnter={(event) => {
      event.preventDefault();
      if (!isDisabled) setDragOver(true);
     }}
     onDragOver={(event) => {
      event.preventDefault();
      if (!isDisabled) setDragOver(true);
     }}
     onDragLeave={(event) => {
      event.preventDefault();
      setDragOver(false);
     }}
     onDrop={handleDrop}
     className={cn(
      "group relative mx-auto flex max-h-80 min-h-48 w-full max-w-2xl cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed px-6 text-center transition-all",
      previewAspectClass,
      dragOver
       ? "border-primary bg-primary/5 shadow-sm"
       : "border-border/80 bg-muted/20 hover:border-primary/40 hover:bg-muted/40",
      isDisabled && "cursor-not-allowed opacity-60"
     )}
    >
     <div
      className={cn(
       "flex size-14 shrink-0 items-center justify-center rounded-full border transition-colors",
       dragOver
        ? "border-primary/30 bg-primary/10 text-primary"
        : "border-border/70 bg-background text-muted-foreground group-hover:border-primary/20 group-hover:text-foreground"
      )}
     >
      {uploading ? (
       <Loader2Icon className="size-7 animate-spin" />
      ) : (
       <MdImage className="size-7" />
      )}
     </div>

     <div className="space-y-1">
      <p className="text-sm font-medium text-foreground">
       {uploading ? "Görsel yükleniyor…" : "Görseli sürükleyip bırakın"}
      </p>
      <p className="text-sm text-muted-foreground">
       veya bilgisayarınızdan seçmek için tıklayın
      </p>
      {dropzoneHint ?? hint ? (
       <p className="pt-1 text-xs text-muted-foreground">{dropzoneHint ?? hint}</p>
      ) : null}
     </div>
    </button>
   )}
  </div>
 );
}
