"use client";

import { toast } from "sonner";

export async function saveContentBlock(key, contentTr, contentEn) {
 const response = await fetch(`/api/admin/content/${key}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ contentTr, contentEn }),
 });

 const data = await response.json();
 if (!response.ok) throw new Error(data.error || "Kaydedilemedi");
 return data;
}

export async function handleContentSave(key, contentTr, contentEn, setLoading, label) {
 setLoading(true);
 try {
  await saveContentBlock(key, contentTr, contentEn);
  toast.success(`${label} kaydedildi.`);
 } catch (error) {
  toast.error(error.message);
 } finally {
  setLoading(false);
 }
}
