import { defaultLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { brandName } from "@/lib/navigation";
import { getSiteWorkingHours, siteEmail, sitePhone, sitePhoneHref } from "@/lib/site-contact";

const MAP_COORDS = "40.07183049974077,29.527898513892158";
const MAP_ZOOM = "19";

function buildMapUrl(language, embed = false) {
 const params = new URLSearchParams({
  q: MAP_COORDS,
  hl: language,
  z: MAP_ZOOM,
 });

 if (embed) {
  params.set("output", "embed");
  params.set("iwloc", "0");
 }

 return `https://www.google.com/maps?${params.toString()}`;
}

export function getFlagshipStore(locale = defaultLocale) {
 const dictionary = getDictionary(locale);
 const mapLanguage = locale === "en" ? "en" : "tr";

 return {
  name: `${brandName.toUpperCase()}`,
  address: dictionary.contact.address,
  phone: sitePhone,
  phoneHref: sitePhoneHref,
  email: siteEmail,
  hours: getSiteWorkingHours(locale),
  mapUrl: buildMapUrl(mapLanguage),
  mapEmbedUrl: buildMapUrl(mapLanguage, true),
 };
}

/** @deprecated use getFlagshipStore(locale) */
export const flagshipStore = getFlagshipStore(defaultLocale);
