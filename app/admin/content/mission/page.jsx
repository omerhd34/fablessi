import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { MissionContentForm } from "@/components/admin/mission-content-form";
import { getAdminContentBlock } from "@/lib/content/queries";
import { Button } from "@/components/ui/button";

export default async function AdminMissionContentPage() {
 const missionVision = await getAdminContentBlock("missionVision");

 return (
  <div className="space-y-6">
   <AdminPageHeader
    title="Misyon & Vizyon"
    description="Misyon, vizyon ve marka değerleri metinlerini düzenleyin."
   >
    <Button variant="outline" size="sm" className="cursor-pointer gap-1.5" asChild>
     <Link href="/admin/content">
      <MdArrowBack className="size-4" aria-hidden />
      Geri
     </Link>
    </Button>
   </AdminPageHeader>

   <MissionContentForm initial={missionVision} />
  </div>
 );
}
