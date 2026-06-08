"use client";

import { LocaleFlagIcon } from "@/components/layout/locale-flag-icons";
import { localeLabels, locales } from "@/lib/i18n/config";
import { useLocale } from "@/contexts/locale-provider";
import { cn } from "@/lib/utils";

function getNextLocale(currentLocale) {
 return currentLocale === "tr" ? "en" : "tr";
}

function MobileLocaleSwitcher({ className }) {
 const { locale, setLocale, t } = useLocale();

 return (
  <div className={cn("locale-switcher locale-switcher--mobile", className)}>
   <p className="locale-switcher-mobile__label">{t("common.language")}</p>
   <div
    className="locale-switcher-mobile__options"
    role="listbox"
    aria-label={t("common.selectLanguage")}
   >
    {locales.map((item) => {
     const active = item === locale;

     return (
      <button
       key={item}
       type="button"
       role="option"
       aria-selected={active}
       className={cn(
        "locale-switcher-mobile__option",
        active && "locale-switcher-mobile__option--active"
       )}
       onClick={() => setLocale(item)}
      >
       <LocaleFlagIcon locale={item} />
       <span>{localeLabels[item]}</span>
      </button>
     );
    })}
   </div>
  </div>
 );
}

function HeaderLocaleSwitcher({ className }) {
 const { locale, setLocale, t } = useLocale();
 const nextLocale = getNextLocale(locale);

 return (
  <button
   type="button"
   className={cn("locale-switcher-btn", className)}
   aria-label={t("common.switchTo", {
    language: localeLabels[nextLocale],
   })}
   onClick={() => setLocale(nextLocale)}
  >
   <LocaleFlagIcon locale={locale} variant="trigger" />
  </button>
 );
}

export function LocaleSwitcher({ variant = "header", className }) {
 if (variant === "mobile") {
  return <MobileLocaleSwitcher className={className} />;
 }

 return <HeaderLocaleSwitcher className={className} />;
}
