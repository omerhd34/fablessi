import "./page.css";
import { StoreShowcase } from "@/components/stores/store-showcase";

export const metadata = {
 title: "İletişim",
 description: "Showroom adresi, iletişim bilgileri ve konum.",
};

export default function IletisimPage() {
 return (
  <div className="bg-background">
   <section className="store-page">
    <div className="container-premium">
     <StoreShowcase />
    </div>
   </section>
  </div>
 );
}
