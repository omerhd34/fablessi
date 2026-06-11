"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "sonner";
import { XIcon } from "@/lib/icons";
import {
 AlertDialog,
 AlertDialogAction,
 AlertDialogCancel,
 AlertDialogContent,
 AlertDialogDescription,
 AlertDialogFooter,
 AlertDialogHeader,
 AlertDialogTitle,
 AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function DeleteButton({
 href,
 label = "Sil",
 confirmTitle = "Silmek istediğinize emin misiniz?",
 confirmDescription = "Bu işlem geri alınamaz.",
 redirectTo,
 onDeleted,
 size,
}) {
 const router = useRouter();
 const [loading, setLoading] = useState(false);

 async function handleDelete() {
  setLoading(true);
  try {
   const response = await fetch(href, { method: "DELETE" });
   if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || "Silinemedi");
   }
   toast.success("Silindi");
   await onDeleted?.();
   if (redirectTo) {
    router.push(redirectTo);
   }
   router.refresh();
  } catch (error) {
   toast.error(error.message);
  } finally {
   setLoading(false);
  }
 }

 const isIconOnly = label === "Sil";

 return (
  <AlertDialog>
   <AlertDialogTrigger asChild>
    <Button
     type="button"
     variant="destructive"
     size={isIconOnly ? size ?? "icon-lg" : "sm"}
     className={isIconOnly ? "cursor-pointer" : "cursor-pointer gap-1.5"}
     disabled={loading}
     aria-label={isIconOnly ? "Sil" : undefined}
    >
     {isIconOnly ? (
      <MdDeleteOutline className="size-5" />
     ) : (
      <>
       <MdDeleteOutline className="size-4" aria-hidden />
       {label}
      </>
     )}
    </Button>
   </AlertDialogTrigger>
   <AlertDialogContent className="gap-6 p-6 sm:max-w-md">
    <div className="relative">
     <AlertDialogCancel
      variant="ghost"
      size="icon-sm"
      className="absolute top-0 right-0 cursor-pointer"
     >
      <XIcon />
      <span className="sr-only">Kapat</span>
     </AlertDialogCancel>
     <AlertDialogHeader className="gap-2 pr-8">
      <AlertDialogTitle className="text-lg">{confirmTitle}</AlertDialogTitle>
      <AlertDialogDescription className="text-sm leading-relaxed">
       {confirmDescription}
      </AlertDialogDescription>
     </AlertDialogHeader>
     <AlertDialogFooter className="-mx-6 -mb-6 mt-2 py-5">
      <AlertDialogCancel className="cursor-pointer">İptal</AlertDialogCancel>
      <AlertDialogAction className="cursor-pointer" onClick={handleDelete} disabled={loading}>
       {loading ? "Siliniyor…" : "Sil"}
      </AlertDialogAction>
     </AlertDialogFooter>
    </div>
   </AlertDialogContent>
  </AlertDialog>
 );
}
