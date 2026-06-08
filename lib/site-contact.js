export function formatSitePhone(value) {
 if (!value) return "";

 const digits = value.replace(/\D/g, "");
 if (!digits) return value.trim();

 let local = digits;
 if (local.startsWith("90") && local.length >= 11) {
  local = `0${local.slice(2)}`;
 } else if (!local.startsWith("0") && local.length === 10) {
  local = `0${local}`;
 }

 if (local.length === 11 && local.startsWith("0")) {
  return `${local.slice(0, 4)} ${local.slice(4, 7)} ${local.slice(7, 9)} ${local.slice(9, 11)}`;
 }

 return value.trim();
}

const phoneRaw = process.env.NEXT_PUBLIC_SITE_PHONE ?? "";

export const sitePhone = formatSitePhone(phoneRaw) || phoneRaw.trim();

function buildSitePhoneHref(value) {
 const digits = value?.replace(/\D/g, "") ?? "";
 if (!digits) return undefined;

 const international = digits.startsWith("90") ? digits : `90${digits.replace(/^0/, "")}`;
 return `tel:+${international}`;
}

export const sitePhoneHref = buildSitePhoneHref(phoneRaw);

export const siteEmail =
 process.env.NEXT_PUBLIC_SITE_EMAIL;

export const siteWorkingHours = [
 { label: "Hafta içi", hours: "09:00 - 20:00" },
 { label: "Hafta sonu", hours: "09:00 - 20:00" },
];

export const socialLinks = [
 {
  label: "Instagram",
  href: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
 },
];

export function getWhatsAppHref() {
 const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? phoneRaw;
 const number = raw.replace(/\D/g, "");
 if (!number) return null;

 return `https://wa.me/${number}`;
}
