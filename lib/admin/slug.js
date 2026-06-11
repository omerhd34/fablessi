import { MAX_ADMIN_SLUG_LENGTH } from "@/lib/admin/field-limits";

const TR_CHAR_MAP = {
 ç: "c",
 ğ: "g",
 ı: "i",
 ö: "o",
 ş: "s",
 ü: "u",
};

export function slugify(text) {
 const slug = String(text ?? "")
  .toLocaleLowerCase("tr")
  .replace(/[çğıöşü]/g, (char) => TR_CHAR_MAP[char] ?? char)
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

 if (!slug) return "";

 return slug.slice(0, MAX_ADMIN_SLUG_LENGTH).replace(/-+$/g, "");
}
