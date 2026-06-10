import { defaultLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

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

const SITE_HOURS_RANGE = "09:00 - 20:00";

export function getSiteWorkingHours(locale = defaultLocale, dictionary = null) {
 const dict = dictionary ?? getDictionary(locale);

 return [
  {
   label: dict.contact.weekdays,
   hours: dict.contact.weekdayHours ?? SITE_HOURS_RANGE,
  },
  {
   label: dict.contact.weekend,
   hours: dict.contact.weekendHours ?? SITE_HOURS_RANGE,
  },
 ];
}

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
