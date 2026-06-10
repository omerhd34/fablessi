import { brandName } from "@/lib/navigation";

const siteDescription =
 "İnegöl merkezli Fablessi — bahçe mobilyalarında kurumsal katalog ve koleksiyon vitrini. Premium, minimalist ve zamansız dış mekan tasarımları.";

const siteTitle = `${brandName} | Premium Bahçe Mobilyaları`;

const ogImagePath = "/og-image.jpg";
const ogImageWidth = 1200;
const ogImageHeight = 630;

function resolveSiteUrl() {
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
 keywords: [
  "bahçe mobilyası",
  "garden furniture",
  "dış mekan mobilya",
  "outdoor furniture",
  "Fablessi",
  "İnegöl",
  "premium bahçe mobilyaları",
 ],
 icons: {
  icon: "/brand/fablessi-logo.png",
  apple: "/brand/fablessi-logo.png",
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
    alt: `${brandName} — Outdoor Living`,
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
