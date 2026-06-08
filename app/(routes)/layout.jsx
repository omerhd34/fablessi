import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MainShell } from "@/components/layout/main-shell";
import { ContactFloat } from "@/components/layout/contact-float";
import { TooltipProvider } from "@/components/ui/tooltip";
import { brandName } from "@/lib/navigation";

const inter = Inter({
 variable: "--font-inter",
 subsets: ["latin", "latin-ext"],
 weight: ["400", "500", "600", "700"],
 display: "swap",
});

export const metadata = {
 title: {
  default: `${brandName} | Premium Bahçe Mobilyaları`,
  template: `%s | ${brandName}`,
 },
 description:
  "İnegöl merkezli Fablessi — bahçe mobilyalarında kurumsal katalog ve koleksiyon vitrini. Premium, minimalist ve zamansız dış mekan tasarımları.",
 keywords: [
  "bahçe mobilyası",
  "dış mekan mobilya",
  "Fablessi",
  "İnegöl",
  "premium bahçe mobilyaları",
 ],
};

export default function RootLayout({ children }) {
 return (
  <html lang="tr" className={`${inter.variable} h-full antialiased`}>
   <body className="min-h-full flex flex-col font-sans">
    <TooltipProvider>
     <MainShell>{children}</MainShell>
     <Header />
     <Footer />
     <ContactFloat />
    </TooltipProvider>
   </body>
  </html>
 );
}
