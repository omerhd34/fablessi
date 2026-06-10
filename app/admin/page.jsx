import Link from "next/link";
import {
 MdAdd,
 MdArticle,
 MdCategory,
 MdCollections,
 MdImage,
 MdPalette,
 MdViewModule,
} from "react-icons/md";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { getAdminStats } from "@/lib/admin/queries";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const statMeta = [
 { key: "collections", label: "Koleksiyon", href: "/admin/collections", icon: MdCollections },
 { key: "categoryGroups", label: "Kategori grubu", href: "/admin/categories", icon: MdCategory },
 { key: "products", label: "Ürün", href: "/admin/products", icon: MdViewModule },
 { key: "variants", label: "Varyant", icon: MdPalette },
 { key: "images", label: "Görsel", icon: MdImage },
];

const quickActions = [
 {
  title: "Yeni ürün ekle",
  description: "Kataloga yeni bir ürün, fiyat ve görsel ekleyin.",
  href: "/admin/products/new",
  cta: "Ürün oluştur",
 },
 {
  title: "Koleksiyon yönet",
  description: "Serileri düzenleyin veya yeni koleksiyon açın.",
  href: "/admin/collections",
  cta: "Koleksiyonlar",
 },
 {
  title: "Kategori grupları",
  description: "Oturma, köşe ve diğer ürün kategorilerini düzenleyin.",
  href: "/admin/categories",
  cta: "Kategoriler",
  icon: MdCategory,
 },
 {
  title: "Site içeriği",
  description: "Hakkımızda, misyon-vizyon ve SSS içeriklerini düzenleyin.",
  href: "/admin/content",
  cta: "İçerik yönetimi",
  icon: MdArticle,
 },
];

export default async function AdminDashboardPage() {
 const stats = await getAdminStats();

 return (
  <div className="space-y-8">
   <AdminPageHeader
    title="Yönetim Paneli"
    description="Koleksiyonları, ürünleri, site içeriklerini ve görselleri tek yerden yönetin."
   >
    <Button className="cursor-pointer gap-2" asChild>
     <Link href="/admin/products/new">
      <MdAdd className="size-4" />
      Yeni ürün
     </Link>
    </Button>
    <Button variant="outline" className="cursor-pointer gap-2" asChild>
     <Link href="/admin/collections/new">
      <MdAdd className="size-4" />
      Yeni koleksiyon
     </Link>
    </Button>
   </AdminPageHeader>

   <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
    {statMeta.map((item) => {
     const Icon = item.icon;
     const value = stats[item.key];

     return (
      <Card
       key={item.key}
       className="border-border/70 bg-card/90 shadow-sm transition-shadow hover:shadow-md"
      >
       <CardHeader className="flex-row items-start justify-between gap-3 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
         {item.label}
        </CardTitle>
        <div className="rounded-lg bg-muted p-2 text-muted-foreground">
         <Icon className="size-4" />
        </div>
       </CardHeader>
       <CardContent className="flex items-end justify-between gap-3">
        <p className="text-3xl font-semibold tracking-tight">{value}</p>
        {item.href ? (
         <Button variant="ghost" size="sm" className="cursor-pointer" asChild>
          <Link href={item.href}>Görüntüle</Link>
         </Button>
        ) : null}
       </CardContent>
      </Card>
     );
    })}
   </div>

   <div className="grid gap-4 lg:grid-cols-2">
    {quickActions.map((action) => {
     const ActionIcon = action.icon;

     return (
     <Card
      key={action.href}
      className="border-border/70 bg-card/90 shadow-sm transition-shadow hover:shadow-md"
     >
      <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
       <div className="space-y-1">
        <div className="flex items-center gap-2">
         {ActionIcon ? <ActionIcon className="size-5 text-muted-foreground" /> : null}
         <h2 className="text-lg font-semibold tracking-tight">{action.title}</h2>
        </div>
        <p className="text-sm text-muted-foreground">{action.description}</p>
       </div>
       <Button variant="outline" className="cursor-pointer shrink-0" asChild>
        <Link href={action.href}>{action.cta}</Link>
       </Button>
      </CardContent>
     </Card>
    );
    })}
   </div>
  </div>
 );
}
