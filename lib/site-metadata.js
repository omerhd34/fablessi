import { brandName } from "@/lib/navigation";
import {
 trLocalSeoDescription,
 trLocalSeoKeywords,
 trLocalSeoTitle,
} from "@/lib/seo/local";

const siteDescription = trLocalSeoDescription;
const siteTitle = `${brandName} | ${trLocalSeoTitle}`;

const ogImagePath = "/og-image.jpg";
const ogImageWidth = 1200;
const ogImageHeight = 630;

export function resolveSiteUrl() {
 if (process.env.NEXT_PUBLIC_APP_URL) {
  return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
 }

 if (process.env.NODE_ENV === "production") {
  return "https://www.fablessi.com";
 }

 return "http://localhost:3000";
}

/** @type {import("next").Metadata} */
export const siteMetadata = {
 metadataBase: new URL(resolveSiteUrl()),
 title: {
  default: siteTitle,
  template: `%s | ${brandName}`,
 },
 description: siteDescription,
 authors: [{ name: "Ömer Halis Demir" }],
 creator: "Ömer Halis Demir",
 keywords: trLocalSeoKeywords,
 icons: {
  icon: [
   { url: "/favicon.ico", sizes: "any" },
   { url: "/brand/favicon-48.png", sizes: "48x48", type: "image/png" },
   { url: "/brand/favicon-96.png", sizes: "96x96", type: "image/png" },
   { url: "/brand/favicon-192.png", sizes: "192x192", type: "image/png" },
   { url: "/brand/favicon-512.png", sizes: "512x512", type: "image/png" },
  ],
  apple: [
   { url: "/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  ],
  shortcut: "/favicon.ico",
 },
 openGraph: {
  type: "website",
  siteName: brandName,
  title: siteTitle,
  description: siteDescription,
  images: [
   {
    url: ogImagePath,
    width: ogImageWidth,
    height: ogImageHeight,
    type: "image/jpeg",
    alt: `${brandName} — İnegöl bahçe mobilyası ve bahçe takımı`,
   },
  ],
 },
 twitter: {
  card: "summary_large_image",
  title: siteTitle,
  description: siteDescription,
  images: [ogImagePath],
 },
};
