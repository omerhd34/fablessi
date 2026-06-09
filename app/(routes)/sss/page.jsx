import { FaqHero } from "@/components/faq/faq-hero";
import { FaqPageContent } from "@/components/faq/faq-page-content";
import { getServerDictionary } from "@/lib/i18n/server";

export async function generateMetadata() {
 const { dictionary } = await getServerDictionary();

 return {
  title: dictionary.pages.faq.title,
  description: dictionary.pages.faq.description,
 };
}

export default function SssPage() {
 return (
  <div className="bg-background">
   <FaqHero />
   <FaqPageContent />
  </div>
 );
}
