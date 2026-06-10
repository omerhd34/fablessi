import { cookies } from "next/headers";
import { getMergedDictionary } from "@/lib/content/queries";
import { defaultLocale, isValidLocale, localeCookieName } from "@/lib/i18n/config";

export async function getLocale() {
 const cookieStore = await cookies();
 const value = cookieStore.get(localeCookieName)?.value;
 return isValidLocale(value) ? value : defaultLocale;
}

export async function getServerDictionary() {
 const locale = await getLocale();
 const dictionary = await getMergedDictionary(locale);
 return { locale, dictionary };
}
