import { StoreShowcase } from "@/components/stores/store-showcase";

export const metadata = {
 title: "Mağazalar",
 description: "Showroom adresi, iletişim bilgileri ve konum.",
};

export default function MagazalarPage() {
 return (
  <div className="bg-background">
   <section className="section-padding-sm">
    <div className="container-premium">
     <StoreShowcase />
    </div>
   </section>
  </div>
 );
}
