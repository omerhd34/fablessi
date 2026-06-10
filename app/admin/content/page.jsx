import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { EditButton } from "@/components/admin/edit-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sections = [
 {
  href: "/admin/content/about",
  title: "Hakkımızda",
  description: "Marka hikayesi, karşılama metni ve sayfa paragrafları.",
 },
 {
  href: "/admin/content/mission",
  title: "Misyon & Vizyon",
  description: "Misyon, vizyon, değerler, taahhütler ve CTA metinleri.",
 },
 {
  href: "/admin/content/faq",
  title: "Sıkça Sorulan Sorular",
  description: "SSS kategorileri, sorular ve cevaplar.",
 },
];

export default function AdminContentPage() {
 return (
  <div className="space-y-6">
   <AdminPageHeader
    title="Site İçeriği"
    description="Hakkımızda, misyon-vizyon ve SSS içeriklerini buradan düzenleyin."
   />

   <div className="grid gap-4 md:grid-cols-2">
    {sections.map((section) => (
     <Card key={section.href}>
      <CardHeader>
       <CardTitle>{section.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-end justify-between gap-4">
       <p className="text-sm text-muted-foreground">{section.description}</p>
       <EditButton href={section.href} className="shrink-0" />
      </CardContent>
     </Card>
    ))}
   </div>
  </div>
 );
}
