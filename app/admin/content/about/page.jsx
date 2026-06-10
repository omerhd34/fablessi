import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AboutContentForm } from "@/components/admin/about-content-form";
import { getAdminContentBlock } from "@/lib/content/queries";
import { Button } from "@/components/ui/button";

export default async function AdminAboutContentPage() {
 const about = await getAdminContentBlock("about");

 return (
  <div className="space-y-6">
   <AdminPageHeader title="Hakkımızda" description="Hakkımızda sayfası içeriklerini düzenleyin.">
    <Button variant="outline" size="sm" className="cursor-pointer" asChild>
     <Link href="/admin/content">Geri</Link>
    </Button>
   </AdminPageHeader>

   <AboutContentForm initial={about} />
  </div>
 );
}
