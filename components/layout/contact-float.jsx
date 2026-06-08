import Link from "next/link";
import { LuMapPin, LuPhone } from "react-icons/lu";
import { TbBrandWhatsapp } from "react-icons/tb";
import { getWhatsAppHref, sitePhoneHref } from "@/lib/site-contact";
import { flagshipStore } from "@/lib/stores";

const FLOAT_ICON_STROKE = 2.5;

export function ContactFloat() {
 const whatsAppHref = getWhatsAppHref();
 const phoneHref = sitePhoneHref;
 const mapUrl = flagshipStore.mapUrl;

 if (!whatsAppHref && !phoneHref && !mapUrl) return null;

 return (
  <div className="fixed right-3 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex flex-col gap-2.5 sm:right-6 sm:bottom-6 sm:gap-3">
   {mapUrl ? (
    <Link
     href={mapUrl}
     target="_blank"
     rel="noopener noreferrer"
     className="flex size-11 items-center justify-center rounded-full bg-white shadow-[0_4px_20px_rgb(0_0_0/15%)] transition-transform hover:scale-105 active:scale-95 sm:size-13"
     aria-label="Konum"
    >
     <LuMapPin
      className="size-5 text-charcoal"
      strokeWidth={FLOAT_ICON_STROKE}
      aria-hidden
     />
    </Link>
   ) : null}
   {phoneHref ? (
    <Link
     href={phoneHref}
     className="flex size-11 items-center justify-center rounded-full bg-white shadow-[0_4px_20px_rgb(0_0_0/15%)] transition-transform hover:scale-105 active:scale-95 sm:size-13"
     aria-label="Telefon ile ara"
    >
     <LuPhone
      className="size-5 text-charcoal"
      strokeWidth={FLOAT_ICON_STROKE}
      aria-hidden
     />
    </Link>
   ) : null}
   {whatsAppHref ? (
    <Link
     href={whatsAppHref}
     target="_blank"
     rel="noopener noreferrer"
     className="flex size-11 items-center justify-center rounded-full bg-white shadow-[0_4px_20px_rgb(0_0_0/15%)] transition-transform hover:scale-105 active:scale-95 sm:size-13"
     aria-label="WhatsApp ile iletişime geç"
    >
     <TbBrandWhatsapp
      className="size-6 text-charcoal"
      strokeWidth={FLOAT_ICON_STROKE}
      aria-hidden
     />
    </Link>
   ) : null}
  </div>
 );
}
