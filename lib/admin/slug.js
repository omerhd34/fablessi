const TR_CHAR_MAP = {
 ç: "c",
 ğ: "g",
 ı: "i",
 ö: "o",
 ş: "s",
 ü: "u",
};

export function slugify(text) {
 return String(text ?? "")
  .toLocaleLowerCase("tr")
  .replace(/[çğıöşü]/g, (char) => TR_CHAR_MAP[char] ?? char)
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");
}
